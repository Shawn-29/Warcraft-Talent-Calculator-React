import { POINTS_REQ_PER_TIER } from 'constants';

import { getTooltip, getUpdatedTalentTable } from '../utils';

import { strCmp } from 'utils/string';

const undoPoint = (state, talentId) => {
    /* check if there are no points left to refund */
    if (state.pointsRemain === state.maxPoints) {
        return state;
    }

    /* find the talent to remove the point from */
    const foundTalent = state.talentTable.get(talentId);
    if (!foundTalent || foundTalent.curRank === 0) {
        return state;
    }

    /* find the tree the talent exists in */
    const foundTree = state.treeTable.get(foundTalent.treeId);
    if (!foundTree) {
        return state;
    }

    let isInvalidTree = false;

    /* get all of the talents from the same tree as the one we want to remove a point from */
    const treeTalents = Array.from(
        state.talentTable.values()).filter(talent => talent.treeId === foundTalent.treeId && talent.curRank > 0);

    /* look for talents that depend on the talent whose point we want to decrease */
    const depTalents = treeTalents.filter(
        talent => foundTalent.name.localeCompare(talent.dependencyName, 'en', { sensitivity: 'accent' }) === 0
    );

    /* if a dependant talent has points in it, check if removing a point from the
        desired talent would make the dependant talent's requirement invalid */
    isInvalidTree = depTalents.some(talent => {
        return talent.curRank > 0 && foundTalent.curRank - 1 < foundTalent.maxRank;
    });

    if (isInvalidTree) {
        return state;
    }

    for (const talent of treeTalents) {
        /* get this talent's tier */
        const tier = talent.y;

        /* get all talents in the tiers beneath the current one */
        const lowerTalents = treeTalents.filter(talent => talent.y < tier);

        /* add up the points spent in the lower tiers */
        const pointsSpent = lowerTalents.reduce((accum, talent) => {
            return accum + (talent === foundTalent ? foundTalent.curRank - 1 : talent.curRank);
        }, 0);

        /* get the points required for this talent */
        const reqPoints = (tier - 1) * POINTS_REQ_PER_TIER;

        /* check if we have the required points for this talent */
        if (pointsSpent < reqPoints) {
            isInvalidTree = true;
            break;
        }
    }

    /* if removing a point from this talent would make its tree invalid,
        disallow the removal by returning the original state */
    if (isInvalidTree) {
        return state;
    }

    const updatedPoints = state.pointsRemain + 1;

    /* update the points spent in the talent's tree */
    const updatedTrees = new Map([
        ...state.treeTable,
        [foundTalent.treeId, { ...foundTree, pointsSpent: foundTree.pointsSpent - 1 }]
    ]);

    /* get the updated talent */
    const updatedTalent = {
        ...foundTalent,
        curRank: foundTalent.curRank - 1,
        tooltip: getTooltip({ ...foundTalent, curRank: foundTalent.curRank - 1 })
    };

    /* update the talents */
    const updatedTalents = getUpdatedTalentTable({
        pointsRemain: updatedPoints,
        talentTable: new Map([...state.talentTable, [talentId, updatedTalent]]),
        treeTable: updatedTrees
    });

    const levelReq = updatedPoints === state.maxPoints ?
        -1 : state.maxLevel - updatedPoints;

    /* update the talent order */
    const lastIndex = state.talentOrder.findLastIndex(orderObj => {
        return strCmp(orderObj.id, foundTalent.id);
        // return orderObj.id.localeCompare(foundTalent.id, 'en', { sensitivity: 'accent' }) === 0
    });

    const newTalentOrder = lastIndex >= 0 ?
        state.talentOrder.slice(0, lastIndex).concat(state.talentOrder.slice(lastIndex + 1)) :
        state.talentOrder;

    return {
        ...state,
        levelReq,
        pointsRemain: updatedPoints,
        talentOrder: newTalentOrder,
        treeTable: updatedTrees,
        talentTable: updatedTalents
    };
};

export default undoPoint;