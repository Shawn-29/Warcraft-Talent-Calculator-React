import { getUpdatedTalent } from './index';

const getUpdatedTalentTable = ({
    talentTable,
    pointsRemain,
    treeTable
}) => {
    return new Map(Array.from(talentTable.keys()).map((id) => {
        return [id, getUpdatedTalent({ talentId: id, talentTable, pointsRemain, treeTable })];
    }));
};

export default getUpdatedTalentTable;