import React, {useEffect} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useJSONGet} from "../hooks";

export default function Testbrukere() {
    const [get, isLoaded, returverdi, error] = useJSONGet();

    useEffect(() => {
        get(API_URL + "/testbrukere");
    }, []);

    const renderTabell = () => {
        return (
            <table className="tabell tabell--stripet">
                <thead>
                    <th>Fødselsnummer</th>
                    <th>Hallo</th>
                </thead>
                <tbody>
                {returverdi.map(fnr =>
                        <tr>
                            <td>{fnr}</td>
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

            {isLoaded ?
                error === '' ? renderTabell()
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </React.Fragment>
    );
};
