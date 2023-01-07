import styled from "styled-components";

const Wrapper = styled.div`
    background-color: var(--clr-black);
    border-radius: var(--border-radius);
    border-style: solid;
    border-width: 2px;
    bottom: -.5rem;
    font-size: .75rem;
    line-height: 1;
    padding: 2px 4px 0;
    pointer-events: none;
    position: absolute;
    right: -.5rem;
    user-select: none;
    z-index: var(--z-index-rank-box);
`;

export default Wrapper;