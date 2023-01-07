import { genAlphanumChars } from 'utils/url';

const buildGlyphTables = (glyphData) => {
    const glyphTables = {};

    for (const [key, data] of Object.entries(glyphData)) {
        const list = new Map();

        const urlCharItr = genAlphanumChars();

        for (const d of data) {
            const glyphId = urlCharItr.next().value;

            list.set(glyphId, { ...d, id: glyphId });
        }
        glyphTables[key] = list;
    }

    return glyphTables;
};

export default buildGlyphTables;