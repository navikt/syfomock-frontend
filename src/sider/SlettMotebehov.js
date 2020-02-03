import React, {useState} from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useInput} from "../hooks";

export default function SlettMotebehov() {
    const [uuid, uuidInput] = useInput({label: "Møtebehov-UUID"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(API_URL + "/motebehov/slett?motebehovUuid=" + uuid)
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
