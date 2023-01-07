import { forwardRef } from 'react';

import Wrapper from './styles';

import RankMiniBox from '../rank-mini-box';

import { onContextMenu } from '../input-events';

import { TALENT_IMG_EXT } from 'constants';

const BgImage = forwardRef(({
    bgURL,
    curRank,
    showRankBox,
    ...props
}, ref) => {
    return <Wrapper
        ref={ref}
        {...props}
        onContextMenu={onContextMenu}
        bgURL={`${bgURL}${TALENT_IMG_EXT}`}
    >
        {showRankBox && <RankMiniBox curRank={curRank} />}
    </Wrapper>;
});

BgImage.displayName = 'BgImage';

export default BgImage;