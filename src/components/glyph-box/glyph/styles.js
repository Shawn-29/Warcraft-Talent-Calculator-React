import styled from 'styled-components';

import { TALENT_ICON_SIZE } from 'constants';

const Wrapper = styled.div`
    align-content: space-between;
    border: 1px solid var(--clr-grey);
    border-radius: var(--border-radius);
    display: flex;
    flex-wrap: wrap;
    min-height: 3.5rem;
    overflow: hidden;
    padding: .5rem;

    .content {
        display: grid;
        grid-column-gap: .5rem;
        grid-template-columns: auto 1fr;
        width: 100%;
    }

    .icon {
        align-self: center;
        background-color: var(--clr-black);
        background-position-y: center;
        background-repeat: no-repeat;
        background-size: cover, 80%;
        border-radius: 100%;
        cursor: pointer;
        height: ${TALENT_ICON_SIZE + 'px'};
        width: ${TALENT_ICON_SIZE + 'px'};
    }

    .icon.selected {
        box-shadow: 0 0 8px 2px var(--clr-highlight);
    }

    .name {
        font-size: .9rem;
        text-overflow: clip;
        overflow: inherit;
    }

    .remove-btn {
        margin-top: .5rem;  
    }
`;

export default Wrapper;