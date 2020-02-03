import React, {useState} from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil} from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {useInput} from "../hooks";

export default function NullstillMote() {
    const [uuid, uuidInput] = useInput({label: "UUID for møte"});
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(API_URL + "/motedeltaker/nullstill?uuid=" + uuid)
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
            <Undertittel>{Sider.NULLSTILL_MOTEDELTAGER}</Undertittel>
            <Undertekst className="blokk-xs">Du må se i møte-appen for arbeidsgivere og hente ut den lange strengen i slutten av URL'en. Sett denne inn i skjemaet under</Undertekst>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <code>{returverdi}</code>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
        </React.Fragment>
    );
}
