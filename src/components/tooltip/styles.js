import styled from "styled-components";

const Wrapper = styled.section`
    background-color: var(--clr-black);
    border: 1px solid var(--clr-grey);
    border-radius: var(--border-radius);
    bottom: 100%;
    line-height: 1.2;
    max-width: 100vw;
    padding: .5rem;
    position: absolute;
    user-select: none;
    width: 20rem;
    z-index: var(--z-index-tooltip);

    .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    header > h4 {
        color: var(--clr-yellow);
    }
    
    .close-btn {
        min-width: 2rem;
    }

    .alloc-msgs {
        display: flex;
        justify-content: space-between;
    }

    .detail {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
`;

export default Wrapper;