import styled from 'styled-components';

import BtnWrapper from '../button/styles';

const Wrapper = styled(BtnWrapper)`
    bottom: .5rem;
    border-radius: 100%;
    filter: drop-shadow(0 0 4px var(--clr-black)) drop-shadow(0 0 4px var(--clr-black));
    height: 3.5rem;
    width: 3.5rem;
    padding: 0;
    position: fixed;
    right: .5rem;
    z-index: var(--z-index-scroll-btn);
`;

export default Wrapper;