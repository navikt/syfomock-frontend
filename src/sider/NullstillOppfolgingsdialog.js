import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillOppfolgingsdialog() {
    const [fnr, fnrInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/slettoppfolgingsdialog/person?fnr=" + fnr);
    };

    return (
        <Side>
            <Undertittel className='blokk-xs'>{Sider.NULLSTILL_OPPFOLGINGSDIALOG.tittel}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}!</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
              </Side>
    );
}
