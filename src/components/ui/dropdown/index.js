import { forwardRef } from 'react';

import Wrapper from './styles';

const Dropdown = forwardRef(({ items, ...props }, ref) => {
    return <Wrapper {...props} ref={ref}>
        {items.map((value, index) => {
            return <option
                key={index}
                value={value}
                onClick={e => {
                    /* whenever the user selections an option, remove the focus from the
                        parent select element so its styling will return to default */
                    e.currentTarget.parentElement.blur();
                }}
            >
                {value}
            </option>
        })}
    </Wrapper>
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;