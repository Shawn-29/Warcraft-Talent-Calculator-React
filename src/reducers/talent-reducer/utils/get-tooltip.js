const getTooltip = ({
    description,
    values,
    curRank,
    maxRank
}) => {
    const tooltip = Object.create(null);

    if (!values) {
        tooltip.msgCurRank = description;
        return tooltip;
    }

    const keys = Object.keys(values);
    const regEx = new RegExp(`${keys.join('|')}`, 'g');

    const getTooltipMsg = (rank) => {
        const insertValues = (desc) => {
            return desc.replace(regEx, (match) => {
                const value = values[match];
                let rankValue = 0;

                if (!value) {
                    return 0;
                }

                if (Array.isArray(value)) {
                    rankValue = value[Math.max(0, rank - 1)];
                }
                else {
                    rankValue = +(value * Math.max(1, (rank))).toFixed(2);
                }

                return rankValue;
            });
        }
        return Array.isArray(description) ?
            description.map(desc => insertValues(desc)) :
            insertValues(description);
    };

    tooltip.msgCurRank = getTooltipMsg(curRank);
    if (curRank > 0 && curRank < maxRank) {
        tooltip.msgNextRank = getTooltipMsg(curRank + 1);
    }

    return tooltip;
};

export default getTooltip;