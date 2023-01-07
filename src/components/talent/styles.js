import styled from 'styled-components';

import { TALENT_ICON_SIZE } from 'constants';

const Wrapper = styled.div.attrs(props => ({
    style: {
        gridColumn: props.x,
        gridRow: props.y
    }
}))`
    color: var(--clr-white);
    height: 100%;
    justify-self: center;
    max-height: ${TALENT_ICON_SIZE + 'px'};
    max-width: ${TALENT_ICON_SIZE + 'px'};
    position: relative;
    width: 100%;

    .unlearn-btn {
        left: 50%;
        position: relative;
        top: 2rem;
        transform: translateX(-50%);
    }
`;

export default Wrapper;