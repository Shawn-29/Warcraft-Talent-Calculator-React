import { STATUS_ALLOWED } from 'constants';

import {
    getTalentOrderObj,
    getTooltip,
    getUpdatedTalentTable
} from '../utils';

const spendPoint = (state, talentId) => {
    /* check if there are points left to spend */
    if (state.pointsRemain === 0) {
        return state;
    }

    /* find the talent to spend the point on */
    const talent = state.talentTable.get(talentId);
    if (!talent) {
        return state;
    }

    /* check if this talent's requirements are met */
    if (talent.status !== STATUS_ALLOWED) {
        return state;
    }

    /* find the tree the talent exists in */
    const tree = state.treeTable.get(talent.treeId);
    if (!tree) {
        return state;
    }

    const updatedPoints = state.pointsRemain - 1;

    const newRank = talent.curRank + 1;

    /* update the points spent in the talent's tree */
    const updatedTrees = new Map([
        ...state.treeTable,
        [talent.treeId, { ...tree, pointsSpent: tree.pointsSpent + 1 }]
    ]);

    /* get the updated talent */
    const updatedTalent = {
        ...talent,
        curRank: newRank,
        tooltip: getTooltip({ ...talent, curRank: newRank })
    };

    /* update the talents */
    const updatedTalents = getUpdatedTalentTable({
        pointsRemain: updatedPoints,
        talentTable: new Map([...state.talentTable, [talentId, updatedTalent]]),
        treeTable: updatedTrees
    });

    const newTalentOrder = state.talentOrder.concat(
        getTalentOrderObj({ ...updatedTalent, isMaxRank: newRank === updatedTalent.maxRank }),
    );

    return {
        ...state,
        levelReq: state.maxLevel - updatedPoints,
        pointsRemain: updatedPoints,
        talentOrder: newTalentOrder,
        treeTable: updatedTrees,
        talentTable: updatedTalents
    };
};

export default spendPoint;