import { useRef } from 'react';

import Wrapper from './styles';

import TalentArea from './talent-area';

import { Button } from 'components/ui';

import useTalents from 'hooks/use-talents';

import Talent from '../talent';

import { IMG_TREE_BG_DIR } from 'constants';

const Tree = ({
    bgURL,
    name: treeName,
    pointsSpent,
    talentList = [],
    id
}) => {
    const { resetTree } = useTalents();

    const numCols = Math.max(...talentList.map(([_, talent]) => talent.x));
    const numRows = Math.max(...talentList.map(([_, talent]) => talent.y));

    const talentRefs = useRef(Array.from(talentList, () => null));

    return <Wrapper className='theme-border'>
        <header className='tree-header'>
            <h4 className='tree-name'>{treeName}</h4>
        </header>
        <TalentArea
            bgURL={`${IMG_TREE_BG_DIR}/${bgURL}`}
            numCols={numCols}
            numRows={numRows}
        >
            {talentList.map(([id, talent], index) => {
                return <Talent
                    ref={(ele) => talentRefs.current[index] = ele}
                    key={id}
                    data={talent}
                />;
            })}
        </TalentArea>
        <div className='tree-footer'>
            <p>Points spent in {treeName}: {pointsSpent} </p>
            <Button
                onClick={() => resetTree(id)}
                onTouchStart={() => resetTree(id)}
                value={'Reset'}
            />
        </div>
    </Wrapper>;
};

export default Tree;