import { GLYPH_PARAM_TABLE, GLYPH_LIMIT } from 'constants';

import getEmpyGlyphSlots from './get-empty-glyph-slots';

const glyphSlotsFromURL = (glyphTables, url) => {
    const newURL = new URL(url);

    const newGlyphSlots = getEmpyGlyphSlots(...Object.keys(glyphTables));

    const urlParamEntries = Object.entries(GLYPH_PARAM_TABLE)
        .map(([glyphType, paramKey]) => {
            return {
                glyphType,
                paramKey,
                queryString: newURL.searchParams.get(paramKey) || ''
            };
        });

    let isInvalidQuery = true;

    buildGlyphSlots: {
        for (const obj of urlParamEntries) {

            const { glyphType, queryString } = obj;

            if (!glyphTables[glyphType]) {
                break buildGlyphSlots;
            }

            /* if the current glyph type has no query string associated with
                it, continue on to the next one */
            if (queryString.length === 0) {
                continue;
            }

            /* check if the query string is valid */
            if (queryString.length > GLYPH_LIMIT) {
                break buildGlyphSlots;
            }

            /* record the glyphs already assigned to slots; use a
                Set to check for duplicates */
            const curGlyphs = new Set();

            let curSlotIndex = 0;

            for (const id of queryString) {

                /* get the glyph this id belongs to */
                const glyph = glyphTables[glyphType].get(id);
                if (!glyph) {
                    break buildGlyphSlots;
                }

                /* check if this glyph has already been assigned to a slot */
                if (curGlyphs.has(glyph)) {
                    break buildGlyphSlots;
                }

                curGlyphs.add(glyph);

                newGlyphSlots[glyphType][curSlotIndex] = glyph;

                ++curSlotIndex;
            }
        }

        /* all query strings have been processed and no errors were found */
        isInvalidQuery = false;
    }

    if (isInvalidQuery) {
        Object.keys(newGlyphSlots).forEach(glyphs => glyphs.fill(null));
    }

    return newGlyphSlots;
};

export default glyphSlotsFromURL;