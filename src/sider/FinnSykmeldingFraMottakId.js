import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";
import Side from "../components/Side/Side";

export default function FinnSykmeldingFraMottakId() {
    const [mottakId, mottakIdInput] = useInput({label: "Mottaks-ID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/sykmelding?mottakid=" + mottakId);
    };

    return (
        <Side tittel={Sider.FINN_SYKMELDING_FRA_MOTTAKID.tittel}>
            <form onSubmit={handleSubmit}>
                {mottakIdInput}
                <Hovedknapp className='blokk-xs'>Finn sykmelding</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </Side>
    );
}
