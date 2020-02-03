import React, { useState } from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {useLocalStorageInput} from "../hooks";
import {Sider} from "../Meny";

export default function FinnArbtakereHosOrgnr() {
    const [orgnr, input] = useLocalStorageInput({label: "Organisasjonsnummer", key: "orgnr"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/arbeidstakere");
        let params = {orgnummer: orgnr};
        url.search = new URLSearchParams(params).toString();
        fetch(url.toString())
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
            });
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.FINN_ARBTAKERE_HOS_ORGNR}</Undertittel>
            <form onSubmit={e => handleSubmit(e)}>
                {input}
                <Hovedknapp className='blokk-xs'>Finn arbeidstakere</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ?
                    <code>{returverdi}</code> :
                    <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );

}
