import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";
import Side from "../components/Side/Side";

export default function SlettOppfolgingsdialog() {
    const [id, idInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/slettoppfolgingsdialog?oppfolgingsdialogId=" + id)
    };

    return (
        <Side tittel={Sider.SLETT_OPPFOLGINGSDIALOG.tittel}>
            <AlertStripeInfo className='blokk-xs'>Oppfølgingsdialog-ID er tallet du finner etter /oppfolgingsplaner/ i URLen til oppfølgingsdialogen</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {idInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
