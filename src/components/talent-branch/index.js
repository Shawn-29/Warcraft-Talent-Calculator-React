import React from 'react';

import Branch from './styles';

import { TALENT_ICON_SIZE, TALENT_GAP } from 'constants';

/* calculate a branch's length based off a distance between two talents */
const calcBranchLength = (dist) => {
    const absDist = Math.abs(dist);
    return TALENT_GAP * absDist + TALENT_ICON_SIZE * Math.max(0, (absDist - 1));
};

const arrowWidth = 20;
const arrowLength = 10;
const barSize = 8;
const barOffset = (TALENT_ICON_SIZE - barSize) >> 1;
const arrowOffset = (TALENT_ICON_SIZE - arrowWidth) >> 1;

const TalentBranch = ({
    disabled,
    dependencyX,
    dependencyY,
    talentX,
    talentY,
}) => {
    /* get the distance between this talent and its dependency, both
        horizontally and vertically, measured as the number of talents
        between the two */
    const xDist = talentX - dependencyX | 0;
    const yDist = talentY - dependencyY | 0;

    /* if there is no distance between the talent and its dependency,
        something is wrong so no branch should be created */
    if (xDist === 0 && yDist === 0) {
        return <></>;
    }

    let branchLength = 0,
        branchWidth = 0,
        branchRotationTransform = '',
        barPolygon = null;

    const arrowPolygon = <polygon
        points={`
            ${arrowWidth * .5} 0,
            ${arrowWidth} ${arrowLength},
            0 ${arrowLength}
        `}
        transform={`translate(${arrowOffset})`}
    />

    if (xDist !== 0 && yDist !== 0) {
        const joinSize = TALENT_ICON_SIZE;

        /* if the distance between a talent and its dependency is positive,
            the branch must be rotated to face the proper direction */
        const yDegs = xDist < 0 ? 0 : 180;
        const xDegs = yDist < 0 ? 0 : 180;
        branchRotationTransform = `rotateX(${xDegs}deg) rotateY(${yDegs}deg)`;

        branchWidth = calcBranchLength(xDist) + joinSize;
        branchLength = calcBranchLength(yDist) + joinSize;

        barPolygon = <polygon
            points={`
                0 ${barOffset + arrowLength},
                0 ${branchLength},
                ${branchWidth - barOffset} ${branchLength},
                ${branchWidth - barOffset} ${branchLength - barSize},
                ${barSize} ${branchLength - barSize},
                ${barSize} ${barOffset + arrowLength}
            `}
            transform={`translate(${barOffset}, ${-barOffset})`}
        />
    }
    else {
        /* calculate the branch's z rotation depending on the distance
            between the talent and its dependency */
        const zDegs = Math.ceil(
            (Math.atan2(yDist, xDist) * (180 / Math.PI) + 1) / 90) * 90;

        branchLength = calcBranchLength(xDist !== 0 ? xDist : yDist);
        branchWidth = TALENT_ICON_SIZE;
        branchRotationTransform = `rotateZ(${zDegs}deg)`;

        barPolygon = <polygon
            points={`
                0 ${arrowLength},
                ${barSize} ${arrowLength},
                ${barSize} ${branchLength},
                0 ${branchLength}
            `}
            transform={`translate(${barOffset})`}
        />;
    }

    return <Branch
        disabled={disabled}
        height={branchLength}
        width={branchWidth}
        style={{ transform: branchRotationTransform }}
    >
        {barPolygon}
        {arrowPolygon}
    </Branch>;
};

export default TalentBranch;