import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";


export default function FinnAktorId() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/hentAktoerIdByFnr/" + fnr);
    };

    return (
        <Side tittel={Sider.FINN_AKTORID.tittel}>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Hent aktør-ID</Hovedknapp>
            </form>
            {isLoaded ?
                error === ''
                    ? <AlertStripeSuksess>Aktør-ID: {returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
