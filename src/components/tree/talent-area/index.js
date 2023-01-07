import React from "react";

import Wrapper from "./styles";

const TalentArea = ({
    children,
    bgURL,
    numCols,
    numRows
}) => {
    const talentProps = {
        bgURL,
        numCols,
        numRows
    };

    return <Wrapper {...talentProps}>
        {children}
    </Wrapper>
};

export default TalentArea;