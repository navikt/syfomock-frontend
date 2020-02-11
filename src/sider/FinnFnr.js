import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function FinnFnr() {
    const [aktorId, aktorIdInput] = useLocalStorageInput({label: "Aktør-ID", key: "aktorid"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/hentFnrByAktoerId/" + aktorId);
    };

    return (
        <Side tittel={Sider.FINN_FNR.tittel}>
            <form onSubmit={handleSubmit}>
                {aktorIdInput}
                <Hovedknapp className='blokk-xs'>Hent fødselsnummer</Hovedknapp>
            </form>
            {isLoaded ?
                !returverdi.match(/^[0-9]+$/)
                    ? error === ''
                    ? <AlertStripeFeil>{returverdi} :(</AlertStripeFeil>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                    : <AlertStripeSuksess>Fødselsnummer: {returverdi}</AlertStripeSuksess>
                : <React.Fragment/>}
        </Side>
    );
}
