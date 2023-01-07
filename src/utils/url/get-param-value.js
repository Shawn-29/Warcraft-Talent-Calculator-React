/**
 * Gets the corresponding parameter value of a given key from a URL.
 * Returns null if no value was found.
 * @param {string} url 
 * @param {string} key 
 * @returns {string|null} The value corresponding with the given key.
 */
const getParamValue = (url, key) => (new URL(url)).searchParams.get(key);

export default getParamValue;