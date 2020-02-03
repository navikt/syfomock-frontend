import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {API_URL} from "../App";
import {useLocalStorageInput} from "../hooks";

export default function FinnAktorId() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(API_URL + "/hentAktoerIdByFnr/" + fnr)
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
            <Undertittel>{Sider.FINN_AKTORID}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Hent aktør-ID</Hovedknapp>
            </form>
            {isLoaded ?
                !returverdi.match(/^[0-9]+$/)
                    ? error === ''
                    ? <AlertStripe type="feil">{returverdi} :(</AlertStripe>
                    : <AlertStripe type="feil">{error}</AlertStripe>
                    : <AlertStripe type="suksess">Aktør-ID: {returverdi}</AlertStripe>
                : <React.Fragment/>}
        </React.Fragment>
    );
}
