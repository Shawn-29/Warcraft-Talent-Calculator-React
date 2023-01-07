import { useEffect, useState } from 'react';

import Wrapper from './styles';

import { Button } from 'components/ui';

import {
    GLYPH_TYPE_MAJOR,
    IMG_UI_DIR,
    IMG_ICON_DIR,
    TALENT_IMG_EXT
} from 'constants';

const defaultBgStyle = `url(${IMG_UI_DIR}/glyph-rings.webp)`;

const Glyph = ({ glyphType, onClick, onRemove, data }) => {
    const isMajorGlyph = glyphType === GLYPH_TYPE_MAJOR;

    const [bgStyle, setBgStyle] = useState(defaultBgStyle);

    useEffect(() => {
        if (data) {
            setBgStyle(defaultBgStyle +
                `, url(${IMG_ICON_DIR}/${data.bgURL}${TALENT_IMG_EXT})`);
        }
        else {
            setBgStyle(defaultBgStyle);
        }
    }, [data]);

    return <Wrapper>
        <div className='content'>
            <div
                className={`icon ${data ? 'selected' : ''}`}
                style={{
                    backgroundImage: bgStyle,
                    backgroundPositionX: `${isMajorGlyph ? '0' : '100%'}, center`
                }}
                title={`Select a ${isMajorGlyph ? 'major' : 'minor'} glyph`}
                onClick={onClick}
            ></div>
            <div className='name'>{data?.name}</div>
        </div>
        {data && <Button
            value='Remove'
            onClick={onRemove}
            className='remove-btn'
        />}
    </Wrapper>
};

export default Glyph;