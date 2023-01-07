import styled from 'styled-components';

const Wrapper = styled.div.attrs(props => ({
    style: {
        backgroundImage: `url(${props.bgURL})`
    }
}))`
    background-color: var(--clr-black);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    border-radius: var(--border-radius);
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 3px 2px var(--clr-black) inset;
    cursor: pointer;
    height: inherit;

    /* position specified so z-index can be used on this element */
    position: relative;

    width: inherit;
    z-index: var(--z-index-talent);

    :hover {
        box-shadow: 0 0 3px 3px #4949ff inset;
    }

    :active {
        box-shadow: 0 0 4px 4px #a9a9ff inset;
    }
`;

export default Wrapper;