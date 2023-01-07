import { useRef, memo, useState } from 'react';

import ClassSelector from './class-selector';

import ExpansionSelector from './expansion-selector';

import { getParamValue } from 'utils/url';

import { URL_PARAM_EXP_KEY, URL_PARAM_CLASS_KEY } from 'constants';

import expList from 'expansion-list.json';

import classList from 'class-list.json';

const DataSelectors = memo(({ onDataChange }) => {
    const expData = useRef(null);
    const classData = useRef(null);

    const [expClassList, setExpClassList] = useState([]);

    const expansionChange = (data) => {
        /* change the theme of the document's body to the current expansion */
        if (expData.current) {
            document.body.classList.remove(expData.current.styleTheme);
        }
        document.body.classList.add(data.styleTheme);

        expData.current = data;

        setExpClassList(classList.filter(c => {
            return Array.isArray(c.expIdList) ?
                c.expIdList.includes(expData.current.id) : true;
        }));
    };

    const classChange = (data) => {
        classData.current = data;

        typeof onDataChange === 'function' &&
            onDataChange(expData.current, classData.current);
    };

    return <>
        <ExpansionSelector
            onExpSelect={expansionChange}
            initialValue={(() => {
                const expParam = +getParamValue(window.location.href, URL_PARAM_EXP_KEY);
                return expList.find(e => e.id === expParam)?.name;
            })()}
        />
        <ClassSelector
            initialClassId={+getParamValue(window.location.href, URL_PARAM_CLASS_KEY)}
            onClassSelect={classChange}
            classList={expClassList}
        />
    </>;
});

export default DataSelectors;