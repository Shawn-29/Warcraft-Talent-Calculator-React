import { useEffect, useRef } from 'react';

import Wrapper from './styles';

import GlyphBox from '../glyph-box';

import {
    GLYPH_TYPE_MAJOR,
    GLYPH_TYPE_MINOR,
    GLYPH_PARAM_TABLE,
    URL_PARAM_GLYPH_MAJOR_KEY,
    URL_PARAM_GLYPH_MINOR_KEY
} from 'constants';

import useGlyphs from 'hooks/use-glyphs';

import { GlobalURL } from 'utils/url';

const GlyphSelector = ({ data }) => {
    const { setGlyphData, glyphSlots } = useGlyphs();

    const initialURL = useRef(window.location.href);

    useEffect(() => {
        setGlyphData(data, initialURL.current);
    }, [data, setGlyphData]);

    useEffect(() => {
        const params = Object.entries(glyphSlots).map(([type, glyphs]) => {
            return [
                GLYPH_PARAM_TABLE[type],
                glyphs.reduce((accum, curGlyph) => {
                    /* check if the glyph slot is empty */
                    if (!curGlyph) {
                        return accum;
                    }
                    return accum + curGlyph.id;
                }, '')
            ];
        });

        GlobalURL.updateSearchParams(...params);
    }, [glyphSlots]);

    useEffect(() => {

        initialURL.current = window.location.origin;

        /* when this component unmounts, it means the talent calculator's current
            talents do not have associated glyphs so remove the glyph parameters
            from the URL */
        return () => {
            GlobalURL.removeParams(URL_PARAM_GLYPH_MAJOR_KEY, URL_PARAM_GLYPH_MINOR_KEY)
        };
    }, []);

    return <Wrapper className='theme-border'>
        <GlyphBox title={'Major Glyphs'} glyphType={GLYPH_TYPE_MAJOR} />
        <GlyphBox title={'Minor Glyphs'} glyphType={GLYPH_TYPE_MINOR} />
    </Wrapper>
};

export default GlyphSelector;