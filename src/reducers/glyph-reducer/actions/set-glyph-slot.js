import { GLYPH_LIMIT } from 'constants';

const setGlyphSlot = (state, { glyphId, slotIndex, glyphType }) => {
    /* check if the glyph slot is valid */
    if (slotIndex >= GLYPH_LIMIT) {
        return state;
    }

    /* get a reference to the glyph table */
    const table = state.glyphTables[glyphType];

    if (!table) {
        return state;
    }

    /* get the glyph the id references */
    const glyph = table.get(glyphId);

    if (!glyph) {
        return state;
    }

    const updatedSlots = [...state.glyphSlots[glyphType]];

    /* check if the glyph already exists in a slot */
    const index = updatedSlots.indexOf(glyph);
    if (index > -1) {
        /* reset the previous slot */
        updatedSlots[index] = null;
    }

    /* insert a glyph reference into the given slot */
    updatedSlots[slotIndex] = glyph;

    return {
        ...state,
        glyphSlots: {
            ...state.glyphSlots,
            [glyphType]: updatedSlots
        }
    };
};

export default setGlyphSlot;