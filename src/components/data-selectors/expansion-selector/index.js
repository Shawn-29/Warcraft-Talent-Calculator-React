import { useEffect, useRef, memo } from 'react';

import Wrapper from './styles';

import expList from 'expansion-list.json';

import { Dropdown } from 'components/ui';

import { capWords, strCmp } from 'utils/string';

const ExpansionSelector = memo(({ onExpSelect, initialValue }) => {
    const dropdownRef = useRef(null);

    /* set the initial selection */
    useEffect(() => {
        const expName = initialValue;

        /* set the initially selected option based on a given value
            or default to the first option if the given value doesn't exist */
        const index = Math.max(0, [...dropdownRef.current.options]
            .findIndex(option => strCmp(option.value, expName)));

        dropdownRef.current.options.selectedIndex = index;

        typeof onExpSelect === 'function' &&
            onExpSelect(expList[index]);
        // eslint-disable-next-line
    }, []);

    return <Wrapper className='theme-border'>
        <label>
            Select an Expansion:
        </label>
        <Dropdown
            ref={dropdownRef}
            items={Object.values(expList).map(exp => capWords(exp.name))}
            onChange={_ => {
                const index = dropdownRef.current.options.selectedIndex;
                typeof onExpSelect === 'function' &&
                    onExpSelect(expList[index]);
            }}
        />
    </Wrapper>;
});

export default ExpansionSelector;