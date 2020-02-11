import React, {useEffect, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import {API_URL} from "../App";
import {Sider} from "../sider";
import Side from "../components/Side/Side";

// Referanse: https://github.com/navikt/syfomock-backend/blob/master/src/frontend/js/containers/TestbrukerStatusOversikt.js

function useGetTestbrukere() {
    const [data, setData] = useState([]);
    const [aktoerIdData, setAktoerIdData] = useState([]);

    async function fetchFnr() {
        const response = await fetch(API_URL + "/testbrukere");
        const json = await response.json();
        setData(json);
    }

    async function fetchAktoerId() {
        let newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            const response = await fetch(API_URL + "/hentAktoerIdByFnr/" + newData[i].fnr);
            newData[i].aktoerId = await response.text();
        }
        setAktoerIdData(newData);
    }

    useEffect(() => {
        fetchFnr();
    }, []);

    useEffect(() => {
        fetchAktoerId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return [aktoerIdData];

}

export default function Testbrukere() {
    const [testbrukere] = useGetTestbrukere();

    const renderTabell = () => {
        return (
            <table className="tabell tabell--stripet">
                <thead>
                    <th>Fødselsnummer</th>
                    <th>AktørID</th>
                </thead>
                <tbody>
                {testbrukere.map(bruker =>
                        <tr>
                            <td>{bruker.fnr}</td>
                            <td>{bruker.aktoerId}</td>
                        </tr>)
                }
                </tbody>
            </table>
        );
    };

    return (
        <Side>
            <Undertittel className='blokk-xs'>{Sider.TESTBRUKERE_STATUS.tittel}</Undertittel>
          <p>Hvis noen trenger dette oppfordres det til å <Lenke href="https://github.com/navikt/syfomock-frontend">gjøre det sjæl!</Lenke></p>

            {renderTabell()}
        </Side>
    );
};
