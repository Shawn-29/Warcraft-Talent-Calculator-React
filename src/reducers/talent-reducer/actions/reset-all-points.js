import { getUpdatedTalentTable } from '../utils';

import { getUpdatedMap } from 'utils/general';

const resetAllPoints = (state) => {
    if (state.pointsRemain === state.maxPoints) {
        return state;
    }

    const updatedTreeTable = getUpdatedMap(
        state.treeTable,
        tree => tree.pointsSpent > 0,
        tree => ({ ...tree, pointsSpent: 0 })
    );

    const resetTalents = getUpdatedMap(
        state.talentTable,
        talent => talent.curRank > 0,
        talent => ({ ...talent, curRank: 0 })
    );

    const updatedTalentTable = getUpdatedTalentTable({
        talentTable: resetTalents,
        pointsRemain: state.maxPoints,
        treeTable: updatedTreeTable
    });

    return {
        ...state,
        levelReq: -1,
        pointsRemain: state.maxPoints,
        talentOrder: [],
        treeTable: updatedTreeTable,
        talentTable: updatedTalentTable
    };
};

export default resetAllPoints;