/**
 * Returns a generator that produces alphanumeric characters in
 * sequence, starting from character code 48 ("0" character) up to
 * code 255 ("ÿ" character).
 */
const genAlphanumChars = function* () {
    /* 48-57 65-90 97-122 192-255 */

    const limit = 255;
    let curId = 48;

    while (curId <= limit) {

        switch (curId) {
            case 57:
                curId = 65;
                break;
            case 90:
                curId = 97;
                break;
            case 122:
                curId = 192;
                break;
            default:
        }

        yield String.fromCharCode(curId++);
    }
};

export default genAlphanumChars;