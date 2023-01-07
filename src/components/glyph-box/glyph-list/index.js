import { useMemo, useState } from 'react';

import Wrapper from './styles';

import useGlyphs from 'hooks/use-glyphs';

import { IMG_ICON_DIR, TALENT_IMG_EXT } from 'constants';

const GlyphList = ({ glyphType, onGlyphSelect }) => {
    const glyphs = useGlyphs().getGlyphsByType(glyphType);

    const [sort, setSort] = useState({ type: 'name', isAsc: true });

    const sortedList = useMemo(() => {
        if (glyphs) {
            const { type, isAsc } = sort;
            return [...glyphs].sort(([, { [type]: a }], [, { [type]: b }]) => {
                return isAsc ? a > b : a < b;
            });
        }
        return [];
    }, [glyphs, sort]);

    const changeSortOrder = (sortType) => {
        const newSort = { ...sort };
        if (sortType === newSort.type) {
            newSort.isAsc = !newSort.isAsc;
        }
        else {
            newSort.type = sortType;
            newSort.isAsc = true;
        }
        setSort(newSort);
    };

    const getSortClass = (headerName) => {
        let sortClass = 'sort-header ';
        if (headerName === sort.type) {
            sortClass += (sort.isAsc ?
                'asc' : 'desc');
        }
        else {
            sortClass += 'unsorted';
        }
        return sortClass;
    }

    return <Wrapper className='theme-border'>
        <header>
            <h3>Select A Glyph</h3>
        </header>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th className={getSortClass('name')} onClick={() => changeSortOrder('name')}>
                        Name
                    </th>
                    <th>Effect</th>
                    <th className={getSortClass('level')} onClick={() => changeSortOrder('level')}>
                        Level
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedList.map(([id, data], index) => {
                    const bgURL = `url(${IMG_ICON_DIR}/${data.bgURL}${TALENT_IMG_EXT})`;
                    return <tr
                        key={index}
                        className='glyph-row'
                        onClick={() => {
                            typeof onGlyphSelect === 'function' && onGlyphSelect(id);
                        }}
                    >
                        <td>
                            <div
                                className='glyph-icon'
                                style={{ backgroundImage: bgURL }}
                            ></div>
                        </td>
                        <td>{data.name}</td>
                        <td className='desc'>{data.description}</td>
                        <td className='req-level'>{data.level}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </Wrapper>
};

export default GlyphList;