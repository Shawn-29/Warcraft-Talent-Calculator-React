import {
    setCalculatorData,
    spendPoint,
    undoPoint,
    resetAllPoints,
    resetTree,
    setInputType,
} from './actions';

export const
    SPEND_POINT = 'spend point',
    UNDO_POINT = 'undo point',
    RESET_ALL_POINTS = 'reset all points',
    RESET_TREE = 'reset tree',
    SET_CALCULATOR_DATA = 'set calculator data',
    SET_INPUT_TYPE = 'set input type';

const actionMap = new Map([
    [SET_INPUT_TYPE, setInputType],
    [SET_CALCULATOR_DATA, setCalculatorData],
    [SPEND_POINT, spendPoint],
    [UNDO_POINT, undoPoint],
    [RESET_ALL_POINTS, resetAllPoints],
    [RESET_TREE, resetTree]
]);

const reducer = (state, { action, payload }) => {
    const handler = actionMap.get(action);
    return handler ? handler(state, payload) : state;
};

export default reducer;