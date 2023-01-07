import styled from 'styled-components';

import { TALENT_GAP, TALENT_ICON_SIZE } from 'constants';

const Wrapper = styled.section`
    background-image: url(${props => props.bgURL});
    background-repeat: no-repeat;
    background-size: 100% 100%;
    box-shadow: 0 0 8px 8px var(--clr-black) inset;
    display: grid;
    grid-column-gap: ${TALENT_GAP + 'px'};
    grid-row-gap: ${TALENT_GAP + 'px'};
    grid-template-columns: repeat(${props => props.numCols}, ${TALENT_ICON_SIZE + 'px'});
    grid-template-rows: repeat(${props => props.numRows}, ${TALENT_ICON_SIZE + 'px'});
    justify-content: center;
    padding: 1rem 0;
    position: relative;
`;

export default Wrapper;