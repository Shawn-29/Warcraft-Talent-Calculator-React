import { STATUS_ALLOWED } from 'constants';

import {
    getTooltip,
    getUpdatedTalentTable,
    updateTalentTableFromURL
} from '../utils';

import { genAlphanumChars } from 'utils/url';

const setCalculatorData = (state, { data, url }) => {
    /* construct the tree and talent tables */
    const treeTable = new Map();
    const talentTable = new Map();

    const urlCharItr = genAlphanumChars();

    data.trees.forEach((tree, index) => {
        const treeId = String(index);
        const { bgURL, name } = tree;
        treeTable.set(treeId, {
            bgURL,
            name,
            pointsSpent: 0
        });

        tree.talentList.forEach((talent) => {

            // const talentId = String.fromCharCode(talentBaseCode);
            const talentId = urlCharItr.next().value;

            talentTable.set(talentId, {
                ...talent,
                curRank: 0,
                details: [],
                reqMsgs: [],
                status: STATUS_ALLOWED,
                treeId,
                id: talentId
            });
        });
    });

    /* now that trees have been constructed, go through their talents
        and check for dependencies */
    talentTable.forEach(talent => {
        const dependencyName = talent.dependencyName;
        /* check if a talent requires points in another talent */
        if (dependencyName) {
            /* find the dependency */
            // const dependencyTalent = findTalent(tree, talent.dependencyName);
            let dependencyTalent = null;
            for (const talent of talentTable.values()) {
                if (talent.name.localeCompare(dependencyName, 'en', { sensitivity: 'accent' }) === 0) {
                    dependencyTalent = talent;
                    break;
                }
            }
            /* if the dependency exists, store its coordinates for displaying
                arrow branches and store its name for lookup purposes */
            if (dependencyTalent) {
                talent.dependency = {
                    name: dependencyTalent.name,
                    x: dependencyTalent.x,
                    y: dependencyTalent.y,
                    id: dependencyTalent.id
                }
            }
        }
        talent.tooltip = getTooltip(talent);
    });

    const newState = {
        ...state,
        classId: data.id,
        expId: data.expId,
        levelReq: -1,
        maxPoints: data.maxPoints,
        maxLevel: data.maxPoints + state.startLevel - 1,
        name: data.name,
        pointsRemain: data.maxPoints,
        talentOrder: [],
        treeTable,
        talentTable
    };

    updateTalentTableFromURL(newState, url);

    newState.talentTable = getUpdatedTalentTable({ ...newState });

    return newState;
};

export default setCalculatorData;