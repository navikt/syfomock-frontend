import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";

export default function FinnFnr() {
    const [aktorId, aktorIdInput] = useLocalStorageInput({label: "Aktør-ID", key: "aktorid"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/hentFnrByAktoerId/" + aktorId);
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.FINN_FNR}</Undertittel>
            <form onSubmit={handleSubmit}>
                {aktorIdInput}
                <Hovedknapp className='blokk-xs'>Hent fødselsnummer</Hovedknapp>
            </form>
            {isLoaded ?
                !returverdi.match(/^[0-9]+$/)
                    ? error === ''
                    ? <AlertStripe type="feil">{returverdi} :(</AlertStripe>
                    : <AlertStripe type="feil">{error}</AlertStripe>
                    : <AlertStripe type="suksess">Fødselsnummer: {returverdi}</AlertStripe>
                : <React.Fragment/>}
        </React.Fragment>
    );
}
