import {
    forwardRef,
    useImperativeHandle,
    useRef,
    useEffect
} from "react";

import Wrapper from "./styles";

const FadeBox = forwardRef((props, ref) => {
    const wrapperRef = useRef(null);

    const fadeAnim = useRef(null);
    const effectRef = useRef(null);

    useEffect(() => {
        effectRef.current = new KeyframeEffect(wrapperRef.current, [
            { opacity: 1 },
            { opacity: 0 }
        ],
            { duration: 1500, fill: 'forwards', direction: 'normal', easing: 'linear' }
        );

        fadeAnim.current = new Animation(
            effectRef.current,
            document.timeline
        );

        fadeAnim.current.addEventListener('finish', _ => {
            wrapperRef.current.classList.add('hidden');
        });
    }, []);

    useImperativeHandle(ref, () => ({
        show: (msg, delay = 3000) => {
            if (wrapperRef.current) {
                effectRef.current.updateTiming({ delay });
                wrapperRef.current.classList.remove('hidden');
                wrapperRef.current.textContent = msg;
                fadeAnim.current.cancel();
                fadeAnim.current.play();
            }
        },
        ref: wrapperRef.current
    }));

    return <Wrapper
        {...props}
        ref={wrapperRef}
        className='theme-border hidden'
    />;
});

FadeBox.displayName = 'FadeBox';

export default FadeBox;