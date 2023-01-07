/**
 * Provides a singleton helper class to work with the browser's local storage.
 */
const LocalStorage = class {
    /**
     * Determines if local storage functionality is enabled.
     */
    static #isEnabled = (() => {
        try {
            /* check if local storage is enabled */
            if (!(navigator.cookieEnabled && window.localStorage)) {
                return false;
            }

            const testKeyVal = String(+new Date());

            /* check if local storage functionality works */
            window.localStorage.setItem(testKeyVal, testKeyVal);
            if (window.localStorage.getItem(testKeyVal) !== testKeyVal) {
                return false;
            }
            window.localStorage.removeItem(testKeyVal);

            return true;
        } catch (_) {
            return false;
        }
    })();

    /**
     * Save a value to local storage. Returns true if the value was set successfully.
     * @param {string} key 
     * @param {string} value 
     */
    static saveValue(key, value) {
        try {
            if (!LocalStorage.#isEnabled) {
                return false;
            }
            window.localStorage.setItem(key, value);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Get a value from local storage. Returns null if the value was not found.
     * @param {string} key 
     * @returns {string|null} The value corresponding with the given key.
     */
    static getValue(key) {
        try {
            if (!LocalStorage.#isEnabled) {
                return null;
            }
            return window.localStorage.getItem(key);
        } catch (_) {
            return null;
        }
    }

    /**
     * Remove a value from local storage associated with a given key.
     * Returns true if a value was removed.
     * @param {string} key 
     */
    static removeItem(key) {
        try {
            if (!LocalStorage.#isEnabled || this.getValue(key) === null) {
                return false;
            }
            window.localStorage.removeItem(key);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Specifies if local storage is enabled.
     */
    static isEnabled() {
        return LocalStorage.#isEnabled;
    }
};

export default LocalStorage;