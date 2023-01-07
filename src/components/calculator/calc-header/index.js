import Wrapper from './styles';

import useTalents from 'hooks/use-talents';

import { Button } from 'components/ui';

import { capWords } from 'utils/string';

const CalcHeader = ({ iconOffset }) => {
    const {
        name,
        levelReq,
        pointsRemain,
        maxPoints,
        resetAllPoints
    } = useTalents();

    return <Wrapper className='theme-border'>
        <div className='calc-class-name'>
            <div
                className='calc-icon'
                style={{
                    backgroundPositionX: `${iconOffset * -100}%`
                }}
            ></div>
            <div>{capWords(name)}</div>
        </div>
        <div>Points Left: {`${pointsRemain}/${maxPoints}`}</div>
        <div className={levelReq < 0 ? 'hidden-keep-space' : null}>Requires Level {levelReq}</div>
        <Button onClick={resetAllPoints} onTouchStart={resetAllPoints} value={'Reset All'} />
    </Wrapper>;
};

export default CalcHeader;