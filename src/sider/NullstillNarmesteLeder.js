import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillNarmesteLeder() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Sykmeldtes fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/nullstill-nl/" + fnr);
    };

    return (
        <Side tittel={Sider.NULLSTILL_NAERMESTELEDER.tittel}>
            <AlertStripeInfo className="blokk-xs">Dette fjerner alle ledere knyttet til brukeren, samt tilhørende hendelser</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </Side>
    );
}
