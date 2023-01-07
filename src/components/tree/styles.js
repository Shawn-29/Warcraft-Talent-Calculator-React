import styled from 'styled-components';

const Wrapper = styled.section`
    background-color: var(--clr-dark-fill);
    color: var(--clr-highlight);
    display: flex;
    flex-direction: column;
    max-width: 20rem;
    width: 100%;

    .tree-header {
        border-bottom: 2px solid var(--clr-highlight);
    }

    .tree-name {
        text-align: center;
    }

    .tree-footer {
        align-items: center;
        border-top: 2px solid var(--clr-highlight);
        display: flex;
        flex-wrap: no-wrap;
        justify-content: space-between;
        padding: 0 .33rem;
    }
`;

export default Wrapper;