import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {Sider} from "../sider";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {useDelete, useJsonGet, useLocalStorageInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillSykmeldt() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [get, isLoaded, returverdi, error] = useJsonGet();
    const [flexDel, flexIsLoaded, flexReturverdi, flexError] = useDelete();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/nullstill/" + fnr);
        flexDel(`https://flex-testdata-reset.dev.nav.no/api/testdata/${fnr}`)
    };

    return (
        <Side tittel={Sider.NULLSTILL_SYKMELDT.tittel}>
            <AlertStripeInfo className="blokk-xs">Dette fjerner alle sykmeldinger fra brukeren, samt tilhørende søknader, hendelser og varsler</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {fnrInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
            {flexIsLoaded ?
                flexError === '' ? <AlertStripeSuksess>{flexReturverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{flexError}</AlertStripeFeil>
                : null}
        </Side>
    );
}
