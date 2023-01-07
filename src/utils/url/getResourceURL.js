import { strToFileFormat } from 'utils/string';

import { TALENT_FILE_DIR } from 'constants';

/**
 * Constructs a resource url from a given expansion and class name.
 * @param {string} expName 
 * @param {string} className 
 */
const getResourceURL = (expName, className) => {
    return [
        TALENT_FILE_DIR,
        strToFileFormat(expName),
        strToFileFormat(className) + '-talents.json'
    ].join('/');
};

export default getResourceURL;