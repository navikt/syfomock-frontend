import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";

export default function FinnSykmeldingFraMottakId() {
    const [mottakId, mottakIdInput] = useInput({label: "Mottaks-ID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/sykmelding?mottakid=" + mottakId);
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.FINN_SYKMELDING_FRA_MOTTAKID}</Undertittel>
            <form onSubmit={handleSubmit}>
                {mottakIdInput}
                <Hovedknapp className='blokk-xs'>Finn sykmelding</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
