import {
    POINTS_REQ_PER_TIER,
    STATUS_DISABLED,
    STATUS_MAX_RANK,
    STATUS_ALLOWED
} from 'constants';

const getUpdatedTalent = ({
    talentId,
    talentTable,
    pointsRemain,
    treeTable
}) => {
    const talent = talentTable.get(talentId);
    if (!talent) {
        return null;
    }

    const reqMsgs = [];
    let status = talent.status;

    /* get the dependent talent if the talent being updated has one */
    const dependencyTalent = talent.dependency &&
        talentTable.get(talent.dependency.id);

    if (dependencyTalent) {
        /* check if the dependent talent has enough points in it */
        const { curRank, maxRank, name } = dependencyTalent;
        if (curRank !== maxRank) {
            reqMsgs.push(`Requires ${maxRank} points in ${name}`);
        }
    }

    /* get the number of points required at the talent's tier to
        be able to put points in it */
    const pointsRequired = (talent.y - 1) * POINTS_REQ_PER_TIER;
    if (pointsRequired > 0) {

        const tree = treeTable.get(talent.treeId);

        /* check if there are enough points spent in this tree to
            be able to put points in this talent */
        if (tree && tree.pointsSpent < pointsRequired) {
            reqMsgs.push(`Requires ${pointsRequired} points in ${tree.name} Talents`);
        }
    }
    /* check if the talent should be disabled */
    if (reqMsgs.length > 0 || (pointsRemain === 0 && talent.curRank === 0)) {
        status = STATUS_DISABLED;
    }
    /* check if the talent is at max rank */
    else if (talent.curRank === talent.maxRank) {
        status = STATUS_MAX_RANK;
    }
    /* points can be spent on this talent */
    else {
        status = STATUS_ALLOWED;
    }

    /* if this talent's status hasn't changed, it doesn't need to be updated */
    if (talent.status === status) {
        return talent;
    }

    return {
        ...talent,
        reqMsgs,
        status
    };
};

export default getUpdatedTalent;