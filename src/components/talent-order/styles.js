import styled from "styled-components";

const Wrapper = styled.article`
    background-color: var(--clr-dark-fill);
    color: var(--clr-highlight);
    margin: 1rem auto 0 auto;
    max-width: 40rem;
    min-height: 4rem;
    position: relative;
    text-align: center;

    header {
        border-bottom: 2px solid var(--clr-highlight);
    }

    .url-box {
        display: grid;
        grid-template-columns: 1fr auto;
        padding: 0 .5rem .5rem;
    }

    .url {
        align-items: center;
        background: var(--clr-black);
        border: 1px solid var(--clr-light-grey);
        border-radius: var(--border-radius);
        display: flex;
        line-height: 1;
        overflow: hidden;
        padding: 0 4px;
        text-align: left;
        white-space: nowrap;
    }

    .talent-container {
        display: grid;
        grid-gap: .5rem;
        grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));
        padding: .5rem;
    }

    .talent-item {
        align-items: center;
        display: grid;
        font-size: .9rem;
        grid-gap: 2px;
        grid-template-columns: repeat(2, auto);
        line-height: 1;
        width: min-content;
    }

    .bg-img {
        background-repeat: no-repeat;
        background-size: 100%;
        border: 1px solid var(--clr-grey);
        border-radius: var(--border-radius);
        display: inline-block;
        height: 28px;
        width: 28px;
    }

    .rank {
        text-align: left;
    }
`;

export default Wrapper;