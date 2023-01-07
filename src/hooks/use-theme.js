import { useState, useEffect } from 'react';

import LocalStorage from 'utils/general/local-storage';

const STORAGE_KEY = 'site-theme';

const useTheme = (...themes) => {
    const defaultTheme = themes[0];

    const getStorageTheme = () => {
        return LocalStorage.getValue(STORAGE_KEY) || defaultTheme;
    };

    const [curTheme, setCurTheme] = useState(getStorageTheme);

    const setTheme = (newTheme) => {
        if (!themes.includes(newTheme)) {
            return;
        }
        setCurTheme(newTheme);
    };

    useEffect(() => {
        LocalStorage.saveValue(STORAGE_KEY, curTheme);
        document.body.classList.add(curTheme);
        return () => {
            document.body.classList.remove(curTheme);
        };
    }, [curTheme]);

    return { curTheme, setTheme };
};

export default useTheme;