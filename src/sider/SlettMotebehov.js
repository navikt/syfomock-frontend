import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";

export default function SlettMotebehov() {
    const [uuid, uuidInput] = useInput({label: "Møtebehov-UUID"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/motebehov/slett?motebehovUuid=" + uuid);
    };

    return (
        <React.Fragment>
            <Undertittel className='blokk-xs'>{Sider.SLETT_MOTEBEHOV.tittel}</Undertittel>
            <AlertStripeInfo className='blokk-xs'>Spør en utvikler eller se på innhold i response fra syfomotebehov i Network-fanen i Chrome</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
