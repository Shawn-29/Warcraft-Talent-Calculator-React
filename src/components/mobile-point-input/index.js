import React from 'react';

import Wrapper from './styles';

import { Button } from 'components/ui';

import useTalents from 'hooks/use-talents';

import { Throttle } from 'utils/general';

import { THROTTLE_KEY } from 'constants';

const MobilePointInput = ({
    talentId,
    canLearn,
    canUnlearn
}) => {
    const { spendPoint, undoPoint } = useTalents();

    return <Wrapper>
        <Button
            className={`pt-btn add ${!canLearn ? 'talent-disabled' : ''}`}
            value={'Learn'}
            onTouchEnd={Throttle.wrap(THROTTLE_KEY, () => spendPoint(talentId))}
        />
        <Button
            className={`pt-btn ${!canUnlearn ? 'talent-disabled' : ''}`}
            value={'Unlearn'}
            onTouchEnd={Throttle.wrap(THROTTLE_KEY, () => undoPoint(talentId))}
        />
    </Wrapper>;
};

export default MobilePointInput;