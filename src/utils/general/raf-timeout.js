/**
 * Invokes a function after a given time. Uses requestAnimationFrame
 * rather than setTimeout in order to provide better precision.
 * @param {number} waitMs 
 * @param {function} onFinish 
 */
const rafTimeout = (waitMs, onFinish) => {
    const endTime = performance.now() + waitMs;
    const timer = () => {
        if (performance.now() >= endTime) {
            onFinish();
        }
        else {
            requestAnimationFrame(timer);
        }
    }
    requestAnimationFrame(timer);
};

export default rafTimeout;