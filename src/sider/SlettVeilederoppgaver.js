import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import AlertStripe, {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {API_URL} from "../App";
import {useLocalStorageInput} from "../hooks";
import {Select} from "nav-frontend-skjema";

export default function SlettVeilederoppgaver() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [type, setType] = useState("ALLE_OPPGAVER");
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let param = "/veilederoppgaver/slett?fnr=" + fnr;
        if (type === "MOTEBEHOV_MOTTATT") {
            param = "/veilederoppgaver/motebehov/slett?fnr=" + fnr;
        }
        fetch(API_URL + param)
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
            });
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
