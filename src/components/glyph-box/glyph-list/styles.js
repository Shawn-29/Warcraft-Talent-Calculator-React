import styled from 'styled-components';

import { TALENT_ICON_SIZE } from 'constants';

const Wrapper = styled.section`
    background-color: var(--clr-dark-fill);

    header {
        text-align: center;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    th, td {
        padding: .5rem;
    }

    .sort-header {
        white-space: nowrap;
    }

    .sort-header:after {
        display: inline-block;
        width: 1rem;
    }

    .sort-header.unsorted:after {
        content: '⬍';
        transform: scaleX(2);
    }

    .sort-header.asc:after {
        content: '▲';
    }

    .sort-header.desc:after {
        content: '▼';
    }

    .test:after {
        content:''
    }

    .sort-header,
    .glyph-row {
        cursor: pointer;
    }

    tr.glyph-row:hover {
        box-shadow: 0 0 8px 4px var(--clr-highlight) inset;
    }

    tr.glyph-row:nth-of-type(odd) {
        background: radial-gradient(var(--clr-fill), var(--clr-dark-fill));
    }

    .glyph-icon {
        background-repeat: no-repeat;
        background-size: cover;
        border: 1px solid var(--clr-grey);
        border-radius: var(--border-radius);
        height: ${TALENT_ICON_SIZE + 'px'};
        width: ${TALENT_ICON_SIZE + 'px'};
    }

    .desc {
        padding: 0 .5rem;
    }

    .req-level {
        text-align: center;
    }
`;

export default Wrapper;