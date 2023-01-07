import { useReducer, createContext } from 'react';

import reducer from 'reducers/talent-reducer';

import { INPUT_TOUCH } from 'constants';

const initialState = {
    name: '',
    pointsRemain: 51,
    maxPoints: 51,
    trees: [],
    inputType: INPUT_TOUCH,
    startLevel: 10,
    maxLevel: 0,
    levelReq: -1, /* level required will be -1 if no points are yet allocated */
    talentOrder: [],
    treeTable: new Map(),
    talentTable: new Map()
};

export const TalentContext = createContext();

export const TalentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <TalentContext.Provider value={[state, dispatch]}>
        {children}
    </TalentContext.Provider>;
};