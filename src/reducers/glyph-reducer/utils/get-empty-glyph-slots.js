import { GLYPH_LIMIT } from 'constants';

const getEmpyGlyphSlots = (...keys) => {
    const glyphSlots = {};
    for (const k of keys) {
        glyphSlots[k] = Array.from({ length: GLYPH_LIMIT }, _ => null);
    }
    return glyphSlots;
};

export default getEmpyGlyphSlots;