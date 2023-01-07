import rafTimeout from './raf-timeout';

/**
 * Provides a singleton helper class to throttle function calls.
 */
const Throttle = class {
    static #keyCache = new Set();
    static #configCache = new Map();

    /**
     * Internal method to validate user-provided throttle duration.
     * Throws a TypeError exception if the duration is invalid.
     * @param {number} waitMs 
     */
    static #checkDelay(waitMs) {
        if (!Number.isFinite(waitMs) || waitMs <= 0) {
            throw TypeError(`Throttle expects a positive number for waitMs. Instead got "${waitMs}".`);
        }
    }

    /**
     * Links a provided key with a specified throttle duration. Functions wrapped using
     * the key will then have a uniform duration.
     * @param {any} key 
     * @param {number} waitMs 
     */
    static config(key, waitMs) {
        Throttle.#checkDelay(waitMs);
        Throttle.#configCache.set(key, waitMs);
    }

    /**
     * Clears a saved throttle duration.
     * @param {any} key 
     */
    static clearConfig(key) {
        return Throttle.#configCache.delete(key);
    }

    /**
     * Wraps a function so it will be invoked only once per throttle interval.
     * @param {any} key 
     * @param {function} handler 
     * @param {number} waitMs 
     * @returns {function} The wrapped function.
     */
    static wrap(key, handler, waitMs = 100) {
        if (typeof handler !== 'function') {
            throw TypeError(`Throttle expects a function for handler. Instead got "${handler}".`);
        }
        if (!Throttle.#configCache.has(key)) {
            Throttle.#checkDelay(waitMs);
        }
        return (...args) => {
            if (Throttle.#keyCache.has(key)) {
                return;
            }
            Throttle.#keyCache.add(key);
            rafTimeout(Throttle.#configCache.get(key) || waitMs, () => {
                Throttle.#keyCache.delete(key);
            });
            return handler(...args);
        };
    }
};

export default Throttle;