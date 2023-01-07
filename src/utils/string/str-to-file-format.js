/**
 * Formats a string to adhere to the file naming convention
 * used by this application.
 * @param {string} str
 * @returns 
 */
const strToFileFormat = str => str.replaceAll(' ', '-');

export default strToFileFormat;