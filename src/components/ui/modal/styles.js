import styled from "styled-components";

const Wrapper = styled.article`
    background-color: #333c;
    color: var(--clr-highlight);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: var(--z-index-modal);

    .content-container {
        background-color: inherit;
        border-radius: var(--border-radius);
        box-shadow: 0 0 4px 5px var(--clr-black);
        max-height: 100%;
        max-width: var(--max-width);
        left: 50%;
        overflow-x: hidden;
        overflow-y: scroll;
        position: fixed;
        top: 0;
        transform: translateX(-50%);
        width: 100%;
    }

    @media screen and (min-width: 576px) {
        .content-container {
            max-height: 95%;
            top: 1rem;
            width: 90%;
        }
    }

    .close-btn {
        position: absolute;
        right: .5rem;
        top: .5rem;
    }
`;

export default Wrapper;