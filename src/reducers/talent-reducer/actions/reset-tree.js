import { getUpdatedTalentTable } from '../utils';

import { getUpdatedMap } from 'utils/general';

const resetTree = (state, treeId) => {
    const foundTree = state.treeTable.get(treeId);
    if (!foundTree || foundTree.pointsSpent === 0) {
        return state;
    }

    const pointsToRefund = foundTree.pointsSpent;
    const updatedPoints = state.pointsRemain + pointsToRefund;

    const resetTalents = getUpdatedMap(
        state.talentTable,
        talent => talent.treeId === treeId && talent.curRank > 0,
        talent => ({ ...talent, curRank: 0 })
    );

    const updatedTrees = new Map([
        ...state.treeTable,
        [treeId, { ...foundTree, pointsSpent: 0 }]
    ]);

    const updatedTalents = getUpdatedTalentTable({
        talentTable: resetTalents,
        pointsRemain: updatedPoints,
        treeTable: updatedTrees
    });

    const levelReq = updatedPoints === state.maxPoints ?
        -1 : state.maxLevel - updatedPoints;

    const newTalentOrder = state.talentOrder.filter(orderObj => {
        return updatedTalents.get(orderObj.id).treeId !== treeId;
    });

    return {
        ...state,
        levelReq,
        pointsRemain: updatedPoints,
        talentOrder: newTalentOrder,
        treeTable: updatedTrees,
        talentTable: updatedTalents
    };
};

export default resetTree;