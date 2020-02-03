import React, {useEffect, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";

export default function Testbrukere() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(API_URL + "/testbrukere")
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
            });
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
