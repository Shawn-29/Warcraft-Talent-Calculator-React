import styled from "styled-components";

const Wrapper = styled.header`
    align-items: center;
    background: linear-gradient(var(--clr-fill), var(--clr-black));
    border-bottom: 2px solid var(--clr-highlight);
    box-shadow: 0 2px 2px 2px var(--clr-black);
    display: flex;
    flex-direction: column;
    height: 5.2rem;
    margin-bottom: 6.5rem;
    padding: .5rem;
    width: 100%;

    .logo {
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        max-width: 20rem;
        opacity: 0;
        position: absolute;
        width: 100%;
        transition: opacity .5s linear;
    }

    .header-text-wrapper {
        position: relative;
        top: 9.3rem;
    }

    .header-text {
        background: radial-gradient(var(--clr-white), var(--clr-fill) 15%, var(--clr-black));
        color: var(--clr-highlight);
        font-size: 1.5rem;
        line-height: 1;
        margin: 0;
        padding: .2rem;
        text-shadow: 0 0 4px var(--clr-black), 0 0 2px var(--clr-black), 0 0 2px var(--clr-black);
    }

    .header-mode-btn {
        position: absolute;
        right: -40px;
        top: 0;
    }
`;

export default Wrapper;