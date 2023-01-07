import { useRef } from 'react';

import Wrapper from './styles';

import { NightModeBtn } from 'components/ui';

import { IMG_UI_DIR } from 'constants';

import expList from 'expansion-list.json';

const LogoHeader = ({ expId }) => {
    const logoRef = useRef(null);

    const expImg = expList[expId]?.img;

    return <Wrapper>
        {expImg &&
            <img
                alt='World of Warcraft logo'
                ref={logoRef}
                className='logo'
                src={`${IMG_UI_DIR}/${expImg}.webp`}
                onLoad={() => {
                    logoRef.current.style.opacity = '1';
                }}
            />
        }
        <div className='header-text-wrapper'>
            <h1 className='header-text theme-border'>Talent Calculator</h1>
            <NightModeBtn className='header-mode-btn' />
        </div>
    </Wrapper>;
};

export default LogoHeader;