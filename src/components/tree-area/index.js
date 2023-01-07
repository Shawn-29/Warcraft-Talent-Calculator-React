import { useMemo } from 'react';

import Wrapper from './styles';

import Tree from '../tree';

import useTalents from 'hooks/use-talents';

const TreeArea = () => {
    const { treeTable, getTalentsByTreeId } = useTalents();

    return useMemo(() => {
        const talentTrees = Array.from(treeTable).map(([id, tree]) => {
            return <Tree key={id}
                {...tree}
                talentList={getTalentsByTreeId(id)}
                id={id}
            />;
        });
        return <Wrapper>
            {talentTrees}
        </Wrapper>;
    }, [treeTable, getTalentsByTreeId]);
};

export default TreeArea;