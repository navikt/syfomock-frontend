import React, {useEffect} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useJSONGet} from "../hooks";

export default function Testbrukere() {
    const [get, isLoaded, returverdi, error] = useJSONGet();

    useEffect(() => {
        get(API_URL + "/testbrukere");
    });

    return (
        <React.Fragment>
            <Undertittel>{Sider.TESTBRUKERE_STATUS}</Undertittel>
            <p>Funker dårlig :)</p>
            {isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </React.Fragment>
    );
};
