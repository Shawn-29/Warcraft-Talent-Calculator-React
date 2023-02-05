/**
 * Callback executed for each element passed to the shift array function.
 * @callback predicate
 * @param {any} value
 * @param {number} index
 * @returns {boolean}
 */

/**
 * Replaces the element at the specified index by moving the first element
 * to the right of that index to the replaced element's position if it
 * satisfies the predicate condition.
 * @param {[]} arr 
 * @param {number} remIndex
 * @param {predicate} pred
 */
const shiftArray = (arr, removalIndex, pred) => {
    let elemMap = {};
    let lastIndex = -1;
    let curIndex = 0;

    for (const elem of arr) {
        ++lastIndex;

        /* do not include the element that is to be removed */
        if (lastIndex === removalIndex) {
            continue;
        }

        /* if an element satisfies the predicate function, place it
            in the new position */
        if (pred(elem, curIndex)) {

            /* if an element already exists at this position, adjust the
                the current index to one position ahead of the last known element */
            if (elemMap[curIndex]) {
                curIndex = lastIndex + 1;
            }

            elemMap[curIndex] = elem;

            ++curIndex;
        }
        else {
            /* if an element fails the predicate function, keeps its
                original position in the array */
            elemMap[lastIndex] = elem;
        }
    }

    return Object.values(elemMap)
        .concat(arr.slice(lastIndex + 1));
};

export default shiftArray