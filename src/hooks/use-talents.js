import { useContext, useCallback } from 'react';

import { TalentContext } from '../contexts/talent-context';

import {
    SPEND_POINT,
    UNDO_POINT,
    RESET_ALL_POINTS,
    RESET_TREE,
    SET_CALCULATOR_DATA,
    SET_INPUT_TYPE
} from 'reducers/talent-reducer';

const useTalents = () => {
    const [state, dispatch] = useContext(TalentContext);

    const setInputType = useCallback((inputType) => {
        dispatch({ action: SET_INPUT_TYPE, payload: inputType });
    }, [dispatch]);

    const resetAllPoints = useCallback(() => {
        dispatch({ action: RESET_ALL_POINTS });
    }, [dispatch]);

    const setCalculatorData = useCallback((data, url) => {
        dispatch({ action: SET_CALCULATOR_DATA, payload: { data, url } });
    }, [dispatch]);

    const getTalentsByTreeId = useCallback((treeId) => {
        return Array.from(state.talentTable).filter(([_, talent]) => talent.treeId === treeId);
    }, [state.talentTable]);

    const spendPoint = useCallback((talentId) => {
        dispatch({ action: SPEND_POINT, payload: talentId });
    }, [dispatch]);

    const undoPoint = useCallback((talentId) => {
        dispatch({ action: UNDO_POINT, payload: talentId });
    }, [dispatch]);

    const resetTree = useCallback((treeId) => {
        dispatch({ action: RESET_TREE, payload: treeId });
    }, [dispatch]);

    return {
        getTalentsByTreeId,
        setInputType,
        spendPoint,
        undoPoint,
        resetAllPoints,
        resetTree,
        setCalculatorData,
        name: state.name,
        pointsRemain: state.pointsRemain,
        levelReq: state.levelReq,
        maxPoints: state.maxPoints,
        inputType: state.inputType,
        startLevel: state.startLevel,
        talentOrder: state.talentOrder,
        treeTable: state.treeTable,
        talentTable: state.talentTable
    };
};

export default useTalents;