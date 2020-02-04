import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";
import SelectSearch from "react-select-search";

export default function SettSykmeldingsstatus() {
    const [uuid, uuidInput] = useInput({label: "Sykmeldings-ID"});
    const [status, setStatus] = useState("NY");
    const [get, isLoaded, returverdi, error] = useGet();
    const options = [
        "NY", "AVBRUTT", "AVVIST", "BEKREFTET", "SENDT", "UTGAATT"
    ];

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/sykmelding/status");
        let params = {status, meldingid: uuid};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <React.Fragment>
            <Undertittel className='blokk-xs'>{Sider.SETT_SYKMELDINGSSTATUS.tittel}</Undertittel>
            <AlertStripeInfo className="blokk-xs">Sykmelding-ID er ID'en som er på slutten av URL'en om du går på sykefravær som en sluttbruker og inn på en spesifikk sykmelding</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <div className="skjemaelement">
                    <label className="skjemaelement__label" htmlFor="diagnosekode">Status</label>
                    <SelectSearch options={options.map(status => ({name: status , value: status}))}
                                  value={status}
                                  name="diagnosekode"
                                  key="diagnosekode"
                                  onChange={e => setStatus(e.value)}
                    />
                </div>
                <Hovedknapp className='blokk-xs'>Sett status</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
