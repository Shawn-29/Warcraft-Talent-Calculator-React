import { useRef, useEffect } from 'react';

import Wrapper from './styles'

import useTalents from 'hooks/use-talents';

import { Button, FadeBox } from 'components/ui';

import { GlobalURL } from 'utils/url';

import {
    URL_PARAM_TALENT_KEY,
    IMG_ICON_DIR,
    TALENT_IMG_EXT
} from 'constants';

const TalentOrder = () => {

    const { talentOrder, startLevel } = useTalents();

    const fadeBoxRef = useRef(null);

    const url = GlobalURL.getStateHook()();

    useEffect(() => {
        const params = [
            URL_PARAM_TALENT_KEY,
            talentOrder.map(talent => talent.id).join('')
        ];

        GlobalURL.updateSearchParams(params);

    }, [talentOrder]);

    return <Wrapper className='theme-border'>
        <header>
            <h4>Level Order</h4>
            <div className='url-box'>
                <div className='url'>{url}</div>
                <Button
                    value='Copy URL'
                    onClick={() => {
                        navigator?.clipboard?.writeText(url)
                            .then(() => {
                                fadeBoxRef.current.ref.style.backgroundColor = 'var(--clr-allowed)';
                                fadeBoxRef.current?.show('Copied URL to the clipboard!', 3000);
                            })
                            .catch((_) => {
                                fadeBoxRef.current.ref.style.backgroundColor = 'var(--clr-warning)';
                                fadeBoxRef.current?.show(
                                    'Could not copy URL to the clipboard. ' +
                                    'Check your browser\'s settings to make sure it can copy text to the clipboard.'
                                    , 8000);
                            })
                    }}
                />
            </div>
            <FadeBox ref={fadeBoxRef} />
        </header>
        <section className={'talent-container'}>
            {talentOrder.map((talent, index) => {
                return <div
                    className='talent-item'
                    key={index}
                    title={[talent.name, `Rank ${talent.curRank}`, `Level ${startLevel + index}`].join(' — ')}
                >
                    <span className='bg-img' style={{
                        backgroundImage: `url(${IMG_ICON_DIR}/${talent.bgURL}${TALENT_IMG_EXT})`
                    }}></span>
                    <div>
                        <div className={`rank ${talent.isMaxRank ? 'text-max-rank' : 'text-allowed'}`}>{talent.curRank}</div>
                        <div>{startLevel + index}</div>
                    </div>
                </div>
            })}
        </section>
    </Wrapper>
};

export default TalentOrder;