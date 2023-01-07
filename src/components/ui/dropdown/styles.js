import styled from 'styled-components';

const Wrapper = styled.select`
    background-color: var(--clr-red);
    border: 1px solid var(--clr-grey);
    border-radius: var(--border-radius);
    box-shadow: 0 0 8px 4px var(--clr-black) inset;
    color: var(--clr-highlight);
    cursor: pointer;
    padding: 2px .25rem;

    :hover {
        background-color: #c33;
        cursor: pointer;
    }

    :focus {
        background-color: var(--clr-white);
        color: var(--clr-black);
    }

    option {
        background-color: var(--clr-white);
        color: var(--clr-black);
    }
`;

export default Wrapper;