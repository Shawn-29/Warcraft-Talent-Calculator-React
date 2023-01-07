import styled from 'styled-components';

import { TALENT_ICON_SIZE } from 'constants';

const Branch = styled.svg`
    fill: ${props => `${props.disabled ? '#787878' : '#eb0'}`};
    position: relative;
    stroke: #000;
    stroke-width: 1px;

    /* set the rotation origin to the center of a talent */
    transform-origin: ${`${TALENT_ICON_SIZE >> 1}px ${-TALENT_ICON_SIZE >> 1}px`} ;
    
    z-index: var(--z-index-branch);
`;

export default Branch;