import styled from 'styled-components';

const Wrapper = styled.button.attrs(props => ({
    style: {
        backgroundImage: `url(${props.bgURL})`
    }
}))`
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 20px;
    cursor: pointer;
    height: 36px;
    width: 36px;
`;

export default Wrapper;