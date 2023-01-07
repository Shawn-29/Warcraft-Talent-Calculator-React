import styled from "styled-components";

const Wrapper = styled.footer`
    background: linear-gradient(var(--clr-dark-fill), var(--clr-black));
    border-top: 2px solid var(--clr-highlight);
    box-shadow: 0 -2px 2px 2px var(--clr-black);
    color: var(--clr-light-grey);
    padding: 1rem;

    .content {
        margin: 0 auto;
        max-width: 40rem;
    }
`;

export default Wrapper;