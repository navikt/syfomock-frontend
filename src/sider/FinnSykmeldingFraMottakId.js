import React, {useState} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useInput} from "../hooks";

export default function FinnSykmeldingFraMottakId() {
    const [mottakId, mottakIdInput] = useInput({label: "Mottaks-ID"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(API_URL + "/sykmelding?mottakid=" + mottakId)
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
            <Undertittel>{Sider.FINN_SYKMELDING_FRA_MOTTAKID}</Undertittel>
            <form onSubmit={handleSubmit}>
                {mottakIdInput}
                <Hovedknapp className='blokk-xs'>Finn sykmelding</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
