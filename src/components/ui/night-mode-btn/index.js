import React from "react";

import Wrapper from "./styles";

import useTheme from 'hooks/use-theme';

import { IMG_UI_DIR } from 'constants';

const THEME_LIGHT = 'light-theme';
const THEME_DARK = 'dark-theme';

const NightModeBtn = ({ ...props }) => {
    const { curTheme, setTheme } = useTheme(THEME_LIGHT, THEME_DARK);

    return <Wrapper
        type='button'
        onClick={() => {
            setTheme(curTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT);
        }}
        bgURL={curTheme === THEME_LIGHT ?
            `${IMG_UI_DIR}/spell_holy_elunesgrace.webp` :
            `${IMG_UI_DIR}/INV_Jewelry_Talisman_08.webp`
        }
        title={`Switch to ${curTheme === THEME_LIGHT ? 'dark' : 'light'} mode`}
        {...props}
    />
};

export default NightModeBtn;