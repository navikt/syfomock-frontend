import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useInput, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function Aktivitetskrav() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [sykmeldingDok, sykmeldingDokInput] = useInput({label: "Sykmeldingsdokument"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/aktivitetskrav");
        let params = {brukerFnr: fnr, sykmeldingDok};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <Side tittel={Sider.AKTIVITETSKRAV.tittel}>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                {sykmeldingDokInput}
                <Hovedknapp className='blokk-xs'>Hent</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
