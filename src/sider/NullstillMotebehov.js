import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillMotebehov() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/slettmoter?fnr=" + fnr);
    };

    return (
          <Side>
            <Undertittel className='blokk-xs'>{Sider.NULLSTILL_MOTEBEHOV.tittel}</Undertittel>
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
