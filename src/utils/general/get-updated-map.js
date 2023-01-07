/**
 * Creates a copy of a given Map object and calls a predicate function on
 * each item. For each predicate call that evaluates to true, the return
 * function will be called on that item, with the result being the new value
 * for that item.
 * @param {Map} map 
 * @param {Function} pred 
 * @param {Function} updateFn
 */
const getUpdatedMap = (map, pred, updateFn) => {
    const m = new Map();
    for (const [key, value] of map) {
        if (!pred(value)) {
            m.set(key, value);
        }
        else {
            m.set(key, updateFn(value));
        }
    }
    return m;
};

export default getUpdatedMap;