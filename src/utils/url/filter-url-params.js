/**
 * Filters a url to only contain search parameters corresponding with
 * a list of given keys.
 * @param {string} url 
 * @param  {...string} keys 
 * @returns {string}
 */
const filterURLParams = (url, ...keys) => {
    const { searchParams, origin } = new URL(url);
    const newURL = new URL(origin);
    for (const k of keys) {
        const value = searchParams.get(k);
        if (value) {
            newURL.searchParams.set(k, value);
        }
    }
    return decodeURI(newURL);
};

export default filterURLParams;