import React, {useCallback, useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Checkbox} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import moment from "moment";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {useGet, useInput, useLocalStorageInput} from "../hooks";
import {Sider} from "../sider";

export default function RegistrerNaermesteLeder() {
    const [brukerFnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [orgnummer, orgnrInput] = useLocalStorageInput({label: "Organisasjonsnummer", key: "orgnr"});
    const [lederFnr, lederFnrInput] = useInput({label: "Fødselsnummer til ny nærmeste leder"});
    const [telefonnummer, telefonnummerInput] = useInput({label: "Telefonnummer til ny nærmeste leder"});
    const [epost, epostInput] = useInput({label: "E-post til ny nærmeste leder"});
    const [aktivFom, aktivFomInput] = useInput({label: "Aktiv fra og med", initialState: moment().format("YYYY-MM-DD")});
    const [agForskutterer, setAgForskutterer] = useState(false);
    const [get, isLoaded, returverdi, error] = useGet();

    const handleCheck = useCallback(() => {
        setAgForskutterer(!agForskutterer);
    }, [agForskutterer]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/naermesteleder");
        let params = {brukerFnr, lederFnr, orgnummer, telefonnummer, epost, aktivFom, agForskutterer};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.REGISTRER_NAERMESTELEDER}</Undertittel>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                {lederFnrInput}
                {orgnrInput}
                {telefonnummerInput}
                {epostInput}
                {aktivFomInput}
                <Checkbox
                    label="Arbeidsgiver forskutterer"
                    name="agForskutterer"
                    key="agForskutterer"
                    onClick={handleCheck}
                    defaultChecked={agForskutterer}
                />
                <Hovedknapp className='blokk-xs'>Registrer</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </React.Fragment>
    );
}
