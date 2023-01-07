import {
    useEffect,
    useRef,
    useMemo
} from 'react';

import Wrapper from './styles';

import { Throttle } from 'utils/general';

const ScrollBtn = () => {
    const btnRef = useRef(null);

    useEffect(() => {
        const handler = Throttle.wrap('scroll', () => {
            if (window.scrollY >= 512) {
                btnRef.current.classList.remove('hidden');
            }
            else {
                btnRef.current.classList.add('hidden');
            }
        }, 100);

        window.addEventListener('scroll', handler, false);
        
        return () => {
            window.removeEventListener('scroll', handler, false);
        };
    }, []);

    return useMemo(() => <Wrapper
        ref={btnRef}
        className={'hidden'}
        onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
    >To&nbsp;Top</Wrapper>, []);
};

export default ScrollBtn;