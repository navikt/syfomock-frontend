import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useFormPost, useInput} from "../hooks";
import Side from "../components/Side/Side";

export default function LeggJournalpostPaKo() {
    const [id, idInput] = useInput({label: "Journalpost-ID"});
    const [post, isLoaded, returverdi, error] = useFormPost();

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new URLSearchParams({journalpostId: id});
        post(API_URL + "/inntektsmelding/ny", data);
    };

    return (
        <Side tittel={Sider.LEGG_JOURNALPOST_PA_KO.tittel}>
            <form onSubmit={handleSubmit}>
                {idInput}
                <Hovedknapp className='blokk-xs'>Send</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment/>}
        </Side>
    );
}
