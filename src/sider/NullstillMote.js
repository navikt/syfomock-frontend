import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {useGet, useInput} from "../hooks";
import Side from "../components/Side/Side";

export default function NullstillMote() {
    const [uuid, uuidInput] = useInput({label: "UUID for møte"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        get(API_URL + "/motedeltaker/nullstill?uuid=" + uuid)
    };

    return (
        <React.Fragment>
          <Side>
            <Undertittel className='blokk-xs'>{Sider.NULLSTILL_MOTEDELTAGER.tittel}</Undertittel>
            <AlertStripeInfo className="blokk-xs">Du må se i møte-appen for arbeidsgivere og hente ut den lange strengen i slutten av URL'en. Sett denne inn i skjemaet under</AlertStripeInfo>
            <form onSubmit={handleSubmit}>
                {uuidInput}
                <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
              </Side>
        </React.Fragment>
    );
}
