import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
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
            <Undertittel className='blokk-xs'>{Sider.FINN_AKTORID.tittel}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Hent aktør-ID</Hovedknapp>
            </form>
            {isLoaded ?
                !returverdi.match(/^[0-9]+$/)
                    ? error === ''
                    ? <AlertStripeFeil>{returverdi} :(</AlertStripeFeil>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                    : <AlertStripeSuksess>Aktør-ID: {returverdi}</AlertStripeSuksess>
                : <React.Fragment/>}
        </React.Fragment>
    );
}
