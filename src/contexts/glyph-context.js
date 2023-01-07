import { useReducer, createContext } from 'react';

import { reducer } from 'reducers/glyph-reducer';

const initialState = {
    glyphTables: {},
    glyphSlots: {}
};

export const GlyphContext = createContext();

export const GlyphProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <GlyphContext.Provider value={[state, dispatch]}>
        {children}
    </GlyphContext.Provider>
};