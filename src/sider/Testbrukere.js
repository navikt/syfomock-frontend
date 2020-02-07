import React, {useEffect, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import Side from "../components/Side/Side";


function useGetTestbrukere() {
    const [data, setData] = useState([]);
    const [aktoerIdData, setAktoerIdData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchFnr() {
        const response = await fetch(API_URL + "/testbrukere");
        const json = await response.json();
        setData(json);
    }

    async function fetchAktoerId() {
        let newData = [...data];
        for (let i = 0; i < newData.length; i++) {
            const response = await fetch(API_URL + "/hentAktoerIdByFnr/" + newData[i].fnr);
            if (response.status !== 200) {
                newData[i].aktoerId = "Henting feilet"
            } else {
                newData[i].aktoerId = await response.text();
            }
        }
        setAktoerIdData(newData);
    }

    useEffect(() => {
        fetchFnr();
    }, []);

    useEffect(() => {
        fetchAktoerId();
        setLoading(false);
    }, [data]);

    return [aktoerIdData, loading];

}

export default function Testbrukere() {
    const [testbrukere, loading] = useGetTestbrukere();

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
            <p>Funker dårlig :)</p>

            {!loading ?
                renderTabell()
                : <React.Fragment/>}
        </Side>
    );
};
