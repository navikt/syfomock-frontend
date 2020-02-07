import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {Sider} from "../sider";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {useJsonGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillSykmeldt() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useJsonGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/nullstill/" + fnr);
    };

    return (
        <Side>
            <Undertittel className='blokk-xs'>{Sider.NULLSTILL_SYKMELDT.tittel}</Undertittel>
            <AlertStripeInfo className="blokk-xs">Dette fjerner alle sykmeldinger fra brukeren, samt tilhørende søknader, hendelser og varsler</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
              </Side>
    );
}
