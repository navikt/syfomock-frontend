import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";

export default function FinnAktorId() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/hentAktoerIdByFnr/" + fnr);
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
