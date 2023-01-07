import { useEffect, useRef, memo } from 'react';

import useTalents from 'hooks/use-talents';

import {
    INPUT_TOUCH,
    INPUT_MOUSE,
    URL_PARAM_EXP_KEY,
    URL_PARAM_CLASS_KEY
} from 'constants';

import CalcHeader from './calc-header';

import TreeArea from '../tree-area';

import '../index.css';

import { GlobalURL } from 'utils/url';

const Calculator = memo(({ data }) => {
    const {
        setCalculatorData,
        setInputType,
    } = useTalents();

    /* on the first call to create the calculator, pass in the complete
        url so the calculator can be built according to the url's
        search parameters */
    const initialURL = useRef(window.location.href);

    useEffect(() => {
        setCalculatorData(data, initialURL.current);
        const params = [
            [URL_PARAM_EXP_KEY, data.expId],
            [URL_PARAM_CLASS_KEY, data.id]
        ];

        // updateSearchParams(...params);
        GlobalURL.updateSearchParams(...params);

    }, [data, setCalculatorData]);

    useEffect(() => {
        /* on subsequent calls to create the calculator, ignore the url's
            search parameters by only passing the url's origin; otherwise, the
            calculator will be incorrectly built from old search parameters;

            note that this useEffect must appear after the one that invokes
            a call to create the calculator */
        initialURL.current = window.location.origin;
    }, []);

    return <article
        onTouchEnd={(e) => { e.preventDefault(); }}
        onTouchStart={() => { setInputType(INPUT_TOUCH); }}
        onMouseDown={() => { setInputType(INPUT_MOUSE); }}
        onMouseEnter={() => { setInputType(INPUT_MOUSE); }}
    >
        <CalcHeader iconOffset={data.iconOffset} />
        <TreeArea />
    </article>;
});

export default Calculator;