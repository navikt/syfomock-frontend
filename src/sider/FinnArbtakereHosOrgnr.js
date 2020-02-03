import React  from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {useGet, useLocalStorageInput} from "../hooks";
import {Sider} from "../Meny";

export default function FinnArbtakereHosOrgnr() {
    const [orgnr, input] = useLocalStorageInput({label: "Organisasjonsnummer", key: "orgnr"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/arbeidstakere");
        let params = {orgnummer: orgnr};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <React.Fragment>
            <Undertittel>{Sider.FINN_ARBTAKERE_HOS_ORGNR}</Undertittel>
            <form onSubmit={e => handleSubmit(e)}>
                {input}
                <Hovedknapp className='blokk-xs'>Finn arbeidstakere</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ?
                    <code>{returverdi}</code> :
                    <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );

}
