import { useEffect, useRef, memo } from 'react';

import Wrapper from './styles';

const ClassSelector = memo(({ initialClassId, onClassSelect, classList }) => {
    const classRefs = useRef(Array.from(classList, () => null));
    const selectionRef = useRef(null);

    const changeSelection = (index) => {
        if (index >= classList.length) {
            return;
        }
        const curSelection = selectionRef.current;

        if (curSelection) {
            curSelection.classList.remove('selected');
        }
        
        selectionRef.current = classRefs.current[index];
        selectionRef.current.classList.add('selected');

        typeof onClassSelect === 'function' &&
            onClassSelect(classList[index]);
    };

    useEffect(() => {
        /* set the initial selection */
        changeSelection(Number.isSafeInteger(initialClassId) &&
            initialClassId >>> 0 < classList.length ? initialClassId : 0);
        // eslint-disable-next-line
    }, [classList]);

    return <Wrapper className='theme-border'>
        <header>
            <h3>Select a Class</h3>
        </header>
        <ul className='class-list'>
            {classList.map((c, index) => {
                return <li
                    className='class-item-wrapper'
                    key={index}
                    onClick={() => changeSelection(index)}
                >
                    <div
                        key={index}
                        className='class-item'
                        ref={(ele) => classRefs.current[index] = ele}
                        style={{
                            backgroundPositionX: `${c.iconOffset * -100}%`
                        }}
                        title={c.name}
                    ></div>
                </li>;
            })}
        </ul>
    </Wrapper>;
});

export default ClassSelector;