import React from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
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
            <Undertittel>{Sider.SLETT_MOTEBEHOV}</Undertittel>
            <Undertekst>Spør en utvikler eller se på innhold i response fra syfomotebehov i Network-fanen i Chrome</Undertekst>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <Hovedknapp className='blokk-xs'>Slett</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
