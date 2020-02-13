import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";
import Side from "../components/Side/Side"

export default function SlettMotebehov() {
    const [uuid, uuidInput] = useInput({label: "Møtebehov-UUID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/motebehov/slett?motebehovUuid=" + uuid);
    };

    return (
        <Side tittel={Sider.SLETT_MOTEBEHOV.tittel}>
            <AlertStripeInfo className='blokk-xs'>Spør en utvikler eller se på innhold i response fra syfomotebehov i Network-fanen i Chrome</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
