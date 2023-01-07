import styled from "styled-components";

const Wrapper = styled.button`
    background-color: var(--clr-red);
    border-radius: var(--border-radius);
    border: 1px solid var(--clr-grey);
    box-shadow: 0 0 8px 4px inset var(--clr-black);
    color: var(--clr-highlight);
    height: fit-content;
    padding: 2px 1rem;
    text-shadow: 1px 1px 1px var(--clr-black);

    :hover {
        background-color: #c33;
        cursor: pointer;
    }

    :active {
        background-color: #d77;
    }
`;

export default Wrapper;