const setInputType = (state, inputType) => {
    if (state.inputType === inputType) {
        return state;
    }
    return {
        ...state,
        inputType
    };
};

export default setInputType;