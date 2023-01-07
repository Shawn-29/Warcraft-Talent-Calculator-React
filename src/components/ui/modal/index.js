import {
    useRef,
    useLayoutEffect,
    useState,
    forwardRef,
    useImperativeHandle,
    useCallback
} from 'react';

import { createPortal } from 'react-dom';

import Button from '../button';

import Wrapper from './styles';

const Modal = forwardRef(({ onClose, children }, ref) => {
    const [isHidden, setIsHidden] = useState(true);

    const wrapperRef = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            ref: wrapperRef.current,
            show: () => setIsHidden(false),
            hide: () => setIsHidden(true)
        }
    });

    const lockScroll = () => {
        document.documentElement.classList.add('no-overflow');
        document.body.classList.add('no-overflow');
    }
    const unlockScroll = () => {
        document.documentElement.classList.remove('no-overflow');
        document.body.classList.remove('no-overflow');
    };
    const showModal = () => {
        wrapperRef.current.classList.remove('hidden');
    };
    const hideModal = () => {
        wrapperRef.current.classList.add('hidden');
    }

    const captureClicks = useCallback(e => {
        /* close the modal if the user clicked outside of it */
        e.target.contains(wrapperRef.current) &&
            setIsHidden(true);
    }, []);

    useLayoutEffect(() => {
        if (isHidden) {
            typeof onClose === 'function' && onClose();
            unlockScroll();
            hideModal();
            document.body.removeEventListener('click', captureClicks);
            document.body.removeEventListener('touchstart', captureClicks);
        }
        else {
            lockScroll();
            showModal();
            document.body.addEventListener('click', captureClicks);
            document.body.addEventListener('touchstart', captureClicks);
            wrapperRef.current.focus();
        }
    }, [isHidden, onClose, captureClicks]);

    return createPortal(
        <Wrapper
            aria-modal='true'
            onKeyDown={e => e.key === 'Escape' && setIsHidden(true)}
            ref={wrapperRef}
            /* onKeyDown won't work if tabIndex isn't set to a negative number */
            tabIndex='-1'
        >
            <div className='content-container'>
                <Button
                    value='x'
                    className='close-btn'
                    onClick={() => setIsHidden(true)}
                />
                {children}
            </div>
        </Wrapper>,
        document.body
    );
});

export default Modal;