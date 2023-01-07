import { useState, useEffect } from 'react';

import { filterURLParams } from './';

const GlobalURL = class {
    /** @type {URL} */
    static #urlObj = null;

    static #setters = new Map();

    static #updateSetters() {
        for (const setter of this.#setters.values()) {
            setter(decodeURI(this.#urlObj.href));
        }
        return this;
    }

    static #checkURLObjState() {
        if (!(this.#urlObj instanceof URL)) {
            throw TypeError('GlobalURL has not been set. Call the setURL method first.');
        }
    }

    /**
     * Replace the browser's url with that of the GlobalURL object's current url.
     */
    static #repBrowserHistory() {
        window.history.replaceState(null, '', this.#urlObj);
        return this;
    }

    /**
     * Set the GlobalURL object's url.
     * @param {string} url
     * @param {...string} allowedParams If provided, only those search
     * parameters specified will be retained in the URL.
     */
    static setURL(url, ...allowedParams) {
        if (allowedParams.length > 0) {
            this.#urlObj = new URL(filterURLParams(url, ...allowedParams));
        }
        else {
            this.#urlObj = new URL(url);
        }

        this.#updateSetters().#repBrowserHistory();
        return this;
    }

    static removeParams(...params) {
        this.#checkURLObjState();

        for (const p of params) {
            this.#urlObj.searchParams.delete(p);
        }

        this.#updateSetters().#repBrowserHistory();

        return this;
    }

    /**
     * Updates the current url's search parameters to include those in the
     * given key/value pairs.
     * @param  {} params 
     */
    static updateSearchParams(...params) {
        this.#checkURLObjState();

        for (const [key, value] of params) {
            this.#urlObj.searchParams.set(key, value);
        }

        this.#updateSetters().#repBrowserHistory();

        return this;
    }

    /**
     * Removes all unspecified keys from the global url.
     * @param  {...string} keys
     */
    static filterParams(...keys) {
        this.#checkURLObjState();

        const { searchParams, origin } = new URL(this.#urlObj);
        const newURL = new URL(origin);
        for (const k of keys) {
            const value = searchParams.get(k);
            if (value) {
                newURL.searchParams.set(k, value);
            }
        }

        this.setURL(newURL);

        return this;
    }

    /**
     * Get a hook that returns a stateful value in the form of the
     * GlobalURL object's current url.
     * @returns {function}
     */
    static getStateHook() {
        const useGlobalURL = () => {

            this.#checkURLObjState();

            const [url, setURL] = useState('');

            useEffect(() => {
                const key = Symbol();
                this.#setters.set(key, setURL);

                setURL(this.#urlObj.href);

                return () => {
                    this.#setters.delete(key);
                };
            }, []);

            return url;
        };

        return useGlobalURL;
    }
};

export default GlobalURL;