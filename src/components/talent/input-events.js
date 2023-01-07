import { INPUT_MOUSE, INPUT_TOUCH } from 'constants';

const onContextMenu = (e) => {
    /* prevent the browser's context menu from opening when the user
        presses the right mouse button */
    e.preventDefault();
};

const onTouchEnd = (e, inputType, callback) => {
    e.preventDefault();
    if (inputType !== INPUT_TOUCH) {
        return;
    }
    /* prevent multiple touches from the user */
    if (e.touches.length > 0) {
        return;
    }
    callback();
};

const onMouseDown = (e, inputType, callback) => {
    if (inputType !== INPUT_MOUSE) {
        return;
    }
    callback(e.button);
};

const onMouseOver = (inputType, callback) => {
    if (inputType !== INPUT_MOUSE) {
        return;
    }
    callback();
};

const onMouseOut = (inputType, callback) => {
    if (inputType !== INPUT_MOUSE) {
        return;
    }
    callback();
};

export {
    onContextMenu,
    onTouchEnd,
    onMouseDown,
    onMouseOver,
    onMouseOut
};