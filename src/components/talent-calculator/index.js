import Calculator from '../calculator';

import TalentOrder from '../talent-order';

import GlyphSelector from '../glyph-selector';

import { TalentProvider } from 'contexts/talent-context';

import { GlyphProvider } from 'contexts/glyph-context';

import { GlobalURL } from 'utils/url';

import { URL_PARAM_CLASS_KEY,
    URL_PARAM_EXP_KEY,
    URL_PARAM_GLYPH_MAJOR_KEY,
    URL_PARAM_GLYPH_MINOR_KEY,
    URL_PARAM_TALENT_KEY
} from 'constants';

GlobalURL.setURL(window.location,
    URL_PARAM_CLASS_KEY, URL_PARAM_EXP_KEY, URL_PARAM_TALENT_KEY,
    URL_PARAM_GLYPH_MAJOR_KEY, URL_PARAM_GLYPH_MINOR_KEY
);

const TalentCalculator = ({ data }) => {
    return <>
        <TalentProvider>
            <Calculator data={data} />
            <TalentOrder />
        </TalentProvider>
        {
            data.glyphs &&
            <GlyphProvider>
                <GlyphSelector data={data.glyphs} />
            </GlyphProvider>
        }
    </>;
};

export default TalentCalculator;