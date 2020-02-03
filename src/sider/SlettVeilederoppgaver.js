import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";
import {Select} from "nav-frontend-skjema";

export default function SlettVeilederoppgaver() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [type, setType] = useState("ALLE_OPPGAVER");
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let param = type === "MOTEBEHOV_MOTTATT" ? "/veilederoppgaver/motebehov/slett?fnr=" + fnr : "/veilederoppgaver/slett?fnr=" + fnr;
        get(API_URL + param);
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.SLETT_VEILEDEROPPGAVER}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Select label="Oppgavetype"
                        value={type}
                        name="type"
                        key="type"
                        onChange={e => setType(e.target.value)}
                >
                    <option key="ALLE_OPPGAVER" value="ALLE_OPPGAVER">Alle oppgaver</option>
                    <option key="MOTEBEHOV_MOTTATT" value="MOTEBEHOV_MOTTATT">Kun mottatte møtebehov</option>
                </Select>
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
