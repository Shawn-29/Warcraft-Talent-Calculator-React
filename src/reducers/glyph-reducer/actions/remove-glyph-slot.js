const removeGlyphSlot = (state, { slotIndex, glyphType }) => {
    /* check if a glyph exists at the given slot index */
    if (!state.glyphSlots[glyphType][slotIndex]) {
        return state;
    }

    const updatedSlots = [...state.glyphSlots[glyphType]];

    /* remove the glyph from the given slot */
    updatedSlots[slotIndex] = null;

    return {
        ...state,
        glyphSlots: {
            ...state.glyphSlots,
            [glyphType]: updatedSlots
        }
    };
};

export default removeGlyphSlot;