import {
    useMemo,
    useRef,
    forwardRef,
    useImperativeHandle
} from 'react';

import Wrapper from './styles';

import useTalents from 'hooks/use-talents';

import TalentBranch from '../talent-branch';

import Tooltip from '../tooltip';

import BgImage from './bg-image';

import { Throttle } from 'utils/general';

import {
    onMouseDown,
    onMouseOut,
    onMouseOver,
    onTouchEnd
} from './input-events';

import {
    STATUS_ALLOWED,
    STATUS_MAX_RANK,
    STATUS_DISABLED,
    THROTTLE_KEY,
    IMG_ICON_DIR
} from 'constants';

const Talent = forwardRef(({ data, treeName }, ref) => {
    const { inputType, spendPoint, undoPoint } = useTalents();

    const tooltipRef = useRef(null);
    const iconRef = useRef(null);

    const hideTooltip = () => {
        tooltipRef.current.hide();
    };
    const showTooltip = () => {
        tooltipRef.current.show();
    };
    const getInputElement = () => {
        return iconRef.current;
    };
    const receivedInput = (e) => {
        return e.target === iconRef.current || tooltipRef.current.receivedInput(e);
    };

    useImperativeHandle(ref, () =>
        ({ hideTooltip, getInputElement, receivedInput })
    );

    return useMemo(() => {
        const {
            bgURL, curRank, dependency,
            status, x, y,
            id: talentId
        } = data;

        return <Wrapper x={x} y={y} >
            <BgImage
                ref={iconRef}
                bgURL={`${IMG_ICON_DIR}/${bgURL}`}
                curRank={curRank}
                showRankBox={status === STATUS_ALLOWED || status === STATUS_MAX_RANK}
                className={`${status === STATUS_MAX_RANK ? 'talent-max-rank' :
                    status === STATUS_ALLOWED ? 'talent-allowed' : 'talent-disabled'}`
                }
                onTouchEnd={e => onTouchEnd(e, inputType, () => {
                    if (!tooltipRef.current.isVisible()) {
                        tooltipRef.current.show();
                        /* if this device has both touch and mouse capability (such as a laptop),
                            check for mouse movement after the user has touched the screen so
                            that we can hide any talent tooltips that were shown due to a
                            touch event */
                        document.body.addEventListener('mousemove', () => {
                            hideTooltip();
                        }, { once: true });
                        /* add an event listener to check if the user clicks outside of the
                            talent so we can hide its tooltip */
                        const listener = e => {
                            if (!receivedInput(e)) {
                                hideTooltip();
                                document.body.removeEventListener('touchstart', listener);
                            }
                        }
                        document.body.addEventListener('touchstart', listener);
                    }
                })}
                onMouseDown={Throttle.wrap(THROTTLE_KEY, (e) => {
                    onMouseDown(e, inputType, (btnType) => {
                        (btnType === 0 && spendPoint(talentId)) ||
                            (btnType === 2 && undoPoint(talentId));
                    })
                })}
                onMouseOver={_ => onMouseOver(inputType, _ => showTooltip())}
                onMouseOut={_ => onMouseOut(inputType, _ => hideTooltip())}
            />
            <Tooltip
                ref={tooltipRef}
                isLearnable={status === STATUS_ALLOWED}
                treeName={treeName}
                {...data}
                talentId={talentId}
            />
            {dependency && <TalentBranch
                dependencyX={dependency.x}
                dependencyY={dependency.y}
                talentX={x}
                talentY={y}
                disabled={status === STATUS_DISABLED}
            />}
        </Wrapper>;
    }, [data, inputType, spendPoint, undoPoint, treeName]);
});

Talent.displayName = 'Talent';

export default Talent;