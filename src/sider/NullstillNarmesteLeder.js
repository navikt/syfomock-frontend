import React from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useGet, useLocalStorageInput} from "../hooks";

export default function NullstillNarmesteLeder() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Sykmeldtes fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/nullstill-nl/" + fnr);
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.NULLSTILL_NAERMESTELEDER}</Undertittel>
            <Undertekst className="blokk-xs">Dette fjerner alle ledere knyttet til brukeren, samt tilhørende hendelser</Undertekst>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
