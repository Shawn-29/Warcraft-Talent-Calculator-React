import styled from 'styled-components';

const Wrapper = styled.section`
    margin: .5rem;

    header {
        margin-bottom: .5rem;
    }

    .glyph-area {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        grid-gap: .5rem;
    }
`;

export default Wrapper;