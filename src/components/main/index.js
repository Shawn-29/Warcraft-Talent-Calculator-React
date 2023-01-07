import { useState, useCallback } from 'react';

import LogoHeader from '../logo-header';

import DataSelectors from '../data-selectors';

import { THROTTLE_KEY } from 'constants';

import TalentCalculator from '../talent-calculator';

import { getResource, getResourceURL } from 'utils/url';

import { Throttle } from 'utils/general';

Throttle.config(THROTTLE_KEY, 100);

const Main = () => {
    const [response, setResponse] = useState({
        data: null, error: null
    });

    const getData = useCallback(async (expData, classData) => {
        /* expansion and class data must both exist before retrieving
            the corresponding resource */
        if (!expData || !classData) {
            return null;
        }

        const response = await getResource(getResourceURL(expData.name, classData.name));

        setResponse(() => {
            if (response.data) {
                /* append properties to the talent response data */
                response.data.maxPoints = expData.maxPoints;
                response.data.expId = expData.id;
                response.data.iconOffset = classData.iconOffset;
            }

            return response;
        });
    }, []);

    return <>
        <LogoHeader expId={response.data?.expId} />
        <main className='container-lg'>
            <DataSelectors onDataChange={getData} />
            <hr className='divider' />
            {response.data && <TalentCalculator data={response.data} />}
        </main>
    </>;
};

export default Main;