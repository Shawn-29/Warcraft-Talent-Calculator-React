import axios from 'axios';

/**
 * Retrieves data from a given URL.
 * @param {string} url 
 */
const getResource = async (url) => {
    let data = null;
    let error = null;

    await axios.get(url)
        .then(response => {
            data = response.data;
        })
        .catch(errorResponse => {
            error = errorResponse;
        });

    return { data, error };
};

export default getResource;