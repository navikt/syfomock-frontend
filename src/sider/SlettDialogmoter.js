import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillDialogmoter() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/motebehov/slett/person?fnr=" + fnr);
    };

    return (
        <Side>
            <Undertittel className='blokk-xs'>{Sider.SLETT_DIALOGMOTER.tittel}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}!</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </Side>
    );
}
