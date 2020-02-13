import React, {useState} from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useInput} from "../hooks";
import {Select} from "nav-frontend-skjema";
import Side from "../components/Side/Side";

export default function SettLegacyFelter() {
    const [id, idInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [versjon, setVersjon] = useState("V1");
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/settlegacyfelter");
        let params = {id, versjon};
        url.search = new URLSearchParams(params).toString();
        get(url);
    };

    return (
        <Side tittel={Sider.SLETT_VEILEDEROPPGAVER.tittel}>
            <form onSubmit={handleSubmit}>
                {idInput}
                <Select label="Oppfølgingsdialog versjon"
                        value={versjon}
                        name="versjon"
                        key="versjon"
                        onChange={e => setVersjon(e.target.value)}
                >
                    <option key="V1" value="V1">Versjon 1</option>
                    <option key="V2" value="V2" disabled>Versjon 2</option>
                </Select>
                <Hovedknapp className='blokk-xs'>Sett felter</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
