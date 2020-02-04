import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
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
            <Undertittel className='blokk-xs'>{Sider.SLETT_OPPFOLGINGSDIALOG.tittel}</Undertittel>
            <AlertStripeInfo className='blokk-xs'>Oppfølgingsdialog-ID er tallet du finner etter /oppfolgingsplaner/ i URLen til oppfølgingsdialogen</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {idInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
