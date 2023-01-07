import React from 'react';

import Wrapper from './styles';

const Button = ({
    onClick,
    value,
    ...props
}) => {
    return <Wrapper type='button' onClick={onClick} {...props}>{value}</Wrapper>;
};

export default Button;