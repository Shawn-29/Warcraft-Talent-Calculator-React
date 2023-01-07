import styled from 'styled-components';

import { NUM_CLASS_ICON_COLS } from 'constants';
import { IMG_UI_DIR } from 'constants';

const Wrapper = styled.header`
    align-items: center;
    background-color: var(--clr-dark-fill);
    box-shadow: 0 8px 4px var(--clr-black);
    color: var(--clr-highlight);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    margin: auto;
    max-width: 40rem;
    padding: .25rem;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: var(--z-index-calc-header);

    .calc-class-name {
        align-items: center;
        display: flex;
        flex-wrap: nowrap;
    }

    .calc-icon {
        background-image: url(${IMG_UI_DIR}/class-icons.webp);
        background-size: ${NUM_CLASS_ICON_COLS * 100}% 100%;
        height: 36px;
        margin-right: 4px;
        width: 36px;
    }
`;

export default Wrapper;