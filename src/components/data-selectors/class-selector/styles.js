import styled from 'styled-components';

import { NUM_CLASS_ICON_COLS, IMG_UI_DIR } from 'constants';

const Wrapper = styled.section`
    background-image: radial-gradient(var(--clr-fill), var(--clr-dark-fill));
	margin: auto;
	max-width: 40rem;
	padding: .5rem;

    .bgImg:active {
        box-shadow: 0 0 4px 4px #a9a9ff inset;
    }

    header {
        color: var(--clr-highlight);
        text-align: center;
    }

    .class-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .class-item-wrapper {
        background-color: var(--clr-black);
        border: 2px solid var(--clr-grey);
        border-radius: var(--border-radius);
        cursor: pointer;
    }

    .class-item {
        background: linear-gradient(var(--clr-white) 30%, var(--clr-black));
        background-image: url(${IMG_UI_DIR}/class-icons.webp);
        background-size: ${NUM_CLASS_ICON_COLS * 100}% 100%;
        border-radius: var(--border-radius);
        display: flex;
        flex-wrap: wrap;
        height: 3.5rem;
        justify-content: center;
        margin: 1px;
        width: 3.5rem;
    }

    .selected {
        box-shadow: 0 0 2px 2px var(--clr-highlight) inset;
        transform: scale(.84);
    }

    .class-name {
        color: var(--clr-highlight);
        text-align: center;
        width: 100%;
    }
`;

export default Wrapper;