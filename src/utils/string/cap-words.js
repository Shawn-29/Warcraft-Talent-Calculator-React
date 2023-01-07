/**
 * Capitalizes the first letter of each word.
 * @param {string} str
 * @param {string} [sep] String used to determine separation of words. If not provided, a space will be used.
 * @returns {string} The given string with the first letter of each word capitalized.
 */
const capWords = (str, sep = ' ') =>
    String(str).split(sep)
        .map(word => word.length > 0 ? word[0].toUpperCase() + word.substring(1) : word)
        .join(sep);

export default capWords;