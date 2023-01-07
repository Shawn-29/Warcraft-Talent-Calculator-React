import {
    setGlyphData,
    setGlyphSlot,
    removeGlyphSlot
} from './actions';

export const
    SET_GLYPH_DATA = Symbol('set glyph data'),
    SET_GLYPH_SLOT = Symbol('set glyph slot'),
    REMOVE_GLYPH_SLOT = Symbol('remove glyph slot');

const actionMap = new Map([
    [SET_GLYPH_DATA, setGlyphData],
    [SET_GLYPH_SLOT, setGlyphSlot],
    [REMOVE_GLYPH_SLOT, removeGlyphSlot]
]);

export const reducer = (state, { action, payload }) => {
    const handler = actionMap.get(action);
    return handler ? handler(state, payload) : state;
};

export default reducer;