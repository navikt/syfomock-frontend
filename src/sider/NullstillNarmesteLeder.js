import React, {useState} from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useLocalStorageInput} from "../hooks";

export default function NullstillNarmesteLeder() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Sykmeldtes fødselsnummer", key: "fnr"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(API_URL + "/nullstill-nl/" + fnr)
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString())
            });
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
