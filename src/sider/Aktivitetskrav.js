import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {API_URL} from "../App";
import {useInput, useLocalStorageInput} from "../hooks";

export default function Aktivitetskrav() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [sykmeldingDok, sykmeldingDokInput] = useInput({label: "Sykmeldingsdokument"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/aktivitetskrav");
        let params = {brukerFnr: fnr, sykmeldingDok};
        url.search = new URLSearchParams(params).toString()
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
            <Undertittel>{Sider.AKTIVITETSKRAV}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                {sykmeldingDokInput}
                <Hovedknapp className='blokk-xs'>Hent</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
