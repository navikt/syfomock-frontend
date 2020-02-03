import React from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";

export default function SlettOppfolgingsdialog() {
    const [id, idInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/slettoppfolgingsdialog?oppfolgingsdialogId=" + id)
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.SLETT_OPPFOLGINGSDIALOG}</Undertittel>
            <Undertekst>Oppfølgingsdialog-ID er tallet du finner etter /oppfolgingsplaner/ i URLen til oppfølgingsdialogen</Undertekst>
            <form onSubmit={handleSubmit}>
                {idInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
