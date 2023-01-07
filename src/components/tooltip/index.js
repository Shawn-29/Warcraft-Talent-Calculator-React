import {
    useRef,
    useImperativeHandle,
    forwardRef,
    useState,
    useLayoutEffect
} from 'react';

import Wrapper from './styles';

import { Button } from 'components/ui';

import MobilePointInput from '../mobile-point-input';

import useTalents from 'hooks/use-talents';

import { INPUT_TOUCH } from 'constants';

const Tooltip = forwardRef(({
    curRank = 0,
    details = [],
    isLearnable = true,
    maxRank = 0,
    tooltip = { msgCurRank: '', msgNextRank: '' },
    reqMsgs = [],
    name: talentName = '',
    talentId
}, ref) => {
    const { inputType } = useTalents();

    const wrapperRef = useRef(null);

    const { msgCurRank, msgNextRank } = tooltip;

    const [visible, setVisible] = useState(false);

    useLayoutEffect(() => {
        if (visible) {
            adjustOffset();
            wrapperRef.current.classList.remove('hidden');
            window.addEventListener('orientationchange', adjustOffset, false);
        }
        else {
            wrapperRef.current.classList.add('hidden');
            window.removeEventListener('orientationchange', adjustOffset, false);
        }
    }, [visible]);

    const adjustOffset = () => {
        const width = Math.min(window.screen.availWidth, 360);
        const screenRight = document.body.getBoundingClientRect().right;
        const parentRight = wrapperRef.current.parentElement.getBoundingClientRect().right;
        const leftOffset = Math.max(0, Math.round(width - (screenRight - parentRight)));
        wrapperRef.current.style.left = `calc(100% - ${leftOffset}px)`;
    };

    const hide = () => setVisible(false);
    const receivedInput = (e) => wrapperRef.current.contains(e.target);
    const show = () => {
        setVisible(true);
    };
    const isVisible = () => !wrapperRef.current.classList.contains('hidden');

    useImperativeHandle(ref, () => {
        return {
            hide,
            receivedInput,
            show,
            isVisible
        }
    });

    return <Wrapper ref={wrapperRef}>
        <header className='header'>
            <h4>{talentName}</h4>
            {inputType === INPUT_TOUCH &&
                <Button
                    className='close-btn'
                    value='x'
                    onTouchStart={hide}
                />}
        </header>
        <div>{`Rank ${curRank}/${maxRank}`}</div>
        {
            Array.isArray(details) &&
            details.map((detail, index) => {
                return <div className='detail' key={index}>
                    {Array.isArray(detail) ?
                        detail.map((d, index) => <div key={index}>{d}</div>) :
                        detail}
                </div>
            })
        }
        {
            reqMsgs.map((msg, index) => {
                return <p key={index} className='text-warning'>{msg}</p>
            })
        }
        <div className='description'>{
            Array.isArray(msgCurRank) ?
                msgCurRank.map((msg, index) => <p key={index}>{msg}</p>) :
                <p>{msgCurRank}</p>
        }</div>
        {
            msgNextRank && <>
                <div className='text-highlight'>Next rank:</div>
                <div className='description'>
                    {Array.isArray(msgNextRank) ?
                        msgNextRank.map((msg, index) => <p key={index}>{msg}</p>) :
                        <p>{msgNextRank}</p>
                    }
                </div>
            </>
        }
        {
            (isLearnable || curRank > 0) && ((inputType === INPUT_TOUCH &&
                <MobilePointInput
                    talentId={talentId}
                    canLearn={isLearnable}
                    canUnlearn={curRank > 0}
                />) ||
                <div className='detail'>
                    <div className={`${isLearnable ? 'text-allowed' : 'text-disabled'}`}>Left-click to learn</div>
                    <div className={`${curRank > 0 ? 'text-warning' : 'text-disabled'}`}>Right-click to unlearn</div>
                </div>)
        }
    </Wrapper>;
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;