/**
 * Performs a case-insensitive string comparison based on the default locale.
 * @param {string} str1 
 * @param {string} str2 
 * @returns {boolean} True if the strings are equal.
 */
const strCmp = (str1, str2) =>
    String(str1).localeCompare(str2, 'en', { sensitivity: 'accent' }) === 0;

export default strCmp;