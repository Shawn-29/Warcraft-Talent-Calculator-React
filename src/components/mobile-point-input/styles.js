import styled from "styled-components";

const Wrapper = styled.div`
    display: grid;
    grid-column-gap: 2rem;
    grid-template-columns: repeat(2, min-content);
    margin: .5rem 0;

    .pt-btn {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .pt-btn.add {
        background-color: var(--clr-green);
    }
`;

export default Wrapper;