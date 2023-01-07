import { useContext, useCallback } from 'react';

import { GlyphContext } from 'contexts/glyph-context';

import {
    SET_GLYPH_SLOT,
    REMOVE_GLYPH_SLOT,
    SET_GLYPH_DATA
} from 'reducers/glyph-reducer';

const useGlyphs = () => {
    const [state, dispatch] = useContext(GlyphContext);

    const setGlyphSlot = useCallback((glyphId, slotIndex, glyphType) => {
        dispatch({ action: SET_GLYPH_SLOT, payload: { glyphId, slotIndex, glyphType } });
    }, [dispatch]);

    const removeGlyphSlot = useCallback((slotIndex, glyphType) => {
        dispatch({ action: REMOVE_GLYPH_SLOT, payload: { slotIndex, glyphType } });
    }, [dispatch]);

    const getGlyphsByType = (type) => {
        if (state.glyphTables[type]) {
            return [...state.glyphTables[type]];
        }
        return [];
    };

    const getGlyphSlotsByType = (type) => {
        if (state.glyphSlots[type]) {
            return [...state.glyphSlots[type]];
        }
        return [];
    };

    const setGlyphData = useCallback((data, url) => {
        dispatch({ action: SET_GLYPH_DATA, payload: { data, url } });
    }, [dispatch]);

    return {
        setGlyphSlot,
        removeGlyphSlot,
        getGlyphsByType,
        getGlyphSlotsByType,
        setGlyphData,
        glyphSlots: state.glyphSlots
    };
};

export default useGlyphs;