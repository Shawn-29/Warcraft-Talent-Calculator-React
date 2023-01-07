import { buildGlyphTables, getEmpyGlyphSlots, glyphSlotsFromURL } from '../utils';

const setGlyphData = (_, { data, url }) => {

    const glyphTables = buildGlyphTables(data);

    const glyphSlots = typeof url === 'string' ?
        glyphSlotsFromURL(glyphTables, url) :
        getEmpyGlyphSlots(...Object.keys(glyphTables));
        
    return {
        glyphTables,
        glyphSlots
    };
};

export default setGlyphData;