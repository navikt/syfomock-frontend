import React, {useEffect, useRef, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {fetchStatusHandler} from "../hooks";

const useGetTestbrukere = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [testbrukere, setTestbrukere] = useState([]);
    const [error, setError] = useState('');

    const get = () => {
        fetch(API_URL + "/testbrukere")
            .then(fetchStatusHandler)
            .then(res => res.json())
            .then((data) => {
                setIsLoaded(true);
                setTestbrukere(data.map(o => ({fnr: o.fnr, aktoerId: ""})));
                setError("");
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
                setTestbrukere("");
            });
    };

    return [get, isLoaded, testbrukere, error, setTestbrukere];
};

export default function Testbrukere() {
    const [getTestbrukere, testbrukereLoaded, testbrukere, testbrukereError, setTestbrukere] = useGetTestbrukere();

    useEffect(() => {
        getTestbrukere();
        }, []);

    useEffect(() => {
        let test = testbrukere;
        for (let i = 0; i < testbrukere.length; i++) {
            fetch(API_URL + "/hentAktoerIdByFnr/" + testbrukere[i].fnr)
                .then(fetchStatusHandler)
                .then(res => res.text())
                .then(res => {
                    test[i].aktoerId = res;
                });
        }
        setTestbrukere(test);
    }, [testbrukere]);

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
        <React.Fragment>
            <Undertittel className='blokk-xs'>{Sider.TESTBRUKERE_STATUS.tittel}</Undertittel>
            <p>Funker dårlig :)</p>

            {testbrukereLoaded ?
                testbrukereError === '' ? renderTabell()
                    : <AlertStripeFeil>{testbrukereError}</AlertStripeFeil>
                : <React.Fragment/>}
        </React.Fragment>
    );
};
