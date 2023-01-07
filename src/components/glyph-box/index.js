import { useRef } from 'react';

import Wrapper from './styles';

import Glyph from './glyph';

import GlyphList from './glyph-list';

import { Modal } from 'components/ui';

import useGlyphs from 'hooks/use-glyphs';

const GlyphBox = ({ title, glyphType }) => {
    const {
        setGlyphSlot,
        removeGlyphSlot,
        getGlyphSlotsByType
    } = useGlyphs();

    const modalRef = useRef(null);

    const glyphSlots = getGlyphSlotsByType(glyphType);

    /* the currently selected glyph slot; used when assigning
        a glyph to a slot */
    const selectedSlot = useRef(-1);

    return <Wrapper>
        <header>
            <h5>{title}</h5>
        </header>
        <div className='glyph-area'>
            {glyphSlots.map((data, index) => {
                return <Glyph
                    key={index}
                    glyphType={glyphType}
                    onClick={() => {
                        modalRef.current.show();
                        selectedSlot.current = index;
                    }}
                    onRemove={() => {
                        removeGlyphSlot(index, glyphType);
                    }}
                    data={data}
                />;
            })}
        </div>
        <Modal ref={modalRef}>
            <GlyphList
                glyphType={glyphType}
                onGlyphSelect={(glyphId) => {
                    modalRef.current.hide();
                    setGlyphSlot(glyphId, selectedSlot.current, glyphType);
                }}
            />
        </Modal>
    </Wrapper>;
};

export default GlyphBox;