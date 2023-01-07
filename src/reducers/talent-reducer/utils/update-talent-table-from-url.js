import { URL_PARAM_TALENT_KEY, POINTS_REQ_PER_TIER } from 'constants';

import { getTalentOrderObj, getTooltip } from './index';

const updateTalentTableFromURL = (state, url) => {
    const newURL = new URL(url);

    const queryString = newURL.searchParams.get(URL_PARAM_TALENT_KEY) || '';

    let isInvalidQuery = false;

    /* check if the query string exists and contains any talent ids */
    if (typeof queryString !== 'string' || queryString.length === 0) {
        isInvalidQuery = true;
    }

    const treeRecord = new Map();
    const talentRecord = new Map();

    const talentOrder = [];

    /* iterate through the query string, allocating points to talents */
    for (const id of queryString) {

        /* get the talent that corresponds to this id */
        const talent = state.talentTable.get(id);

        /* no talent was found so the query string is invalid */
        if (!talent) {
            isInvalidQuery = true;
            break;
        }

        if (!talentRecord.has(talent)) {
            talentRecord.set(talent, 0);
        }

        const newRank = talentRecord.get(talent) + 1;

        /* this talent is already at its highest rank so the query string is invalid  */
        if (newRank > talent.maxRank) {
            isInvalidQuery = true;
            break;
        }

        /* get the dependent talent if the talent being updated has one */
        const dependencyTalent = talent.dependency &&
            state.talentTable.get(talent.dependency.id);

        if (dependencyTalent) {
            if (talentRecord.get(dependencyTalent) !== dependencyTalent.maxRank) {
                isInvalidQuery = true;
                break;
            }
        }

        const tree = state.treeTable.get(talent.treeId);

        if (!treeRecord.has(tree)) {
            treeRecord.set(tree, 0);
        }

        /* get the number of points required at the talent's tier to
            be able to put points in it */
        const pointsRequired = (talent.y - 1) * POINTS_REQ_PER_TIER;
        if (pointsRequired > 0) {
            /* check if there are enough points spent in this tree to
                be able to put points in this talent */
            if (treeRecord.get(tree) < pointsRequired) {
                isInvalidQuery = true;
                break;
            }
        }

        /* all requirements are met so place a point in this talent */
        treeRecord.set(tree, treeRecord.get(tree) + 1);
        talentRecord.set(talent, newRank);

        talentOrder.push(getTalentOrderObj({
            ...talent,
            curRank: newRank,
            isMaxRank: newRank === talent.maxRank
        }));
    }

    if (!isInvalidQuery) {
        for (const [tree, pointsSpent] of treeRecord) {
            tree.pointsSpent = pointsSpent;
        }
        for (const [talent, rank] of talentRecord) {
            talent.curRank = rank;
            talent.tooltip = getTooltip({ ...talent, curRank: talent.maxRank })
        }
        state.pointsRemain = state.maxPoints - queryString.length;
        state.levelReq = state.startLevel + queryString.length - 1;

        state.talentOrder = talentOrder;
    }
};

export default updateTalentTableFromURL;