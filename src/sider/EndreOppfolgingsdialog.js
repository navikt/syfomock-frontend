import React from 'react';
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useFlatpicker, useGet, useInput} from "../hooks";
import moment from "moment";
import Side from "../components/Side/Side";

export default function EndreOppfolgingsdialog() {
    const [oppfolgingsdialogId, oppfolgingsdialogIdInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [fom, fomInput] = useFlatpicker({label: "Fom", initialState: moment().subtract(7, "days"), pickrFormat: "d.m.Y", momentFormat: "DD.MM.YYYY"});
    const [tom, tomInput] = useFlatpicker({label: "Tom", initialState: moment(), pickrFormat: "d.m.Y", momentFormat: "DD.MM.YYYY"});
    const [evalueres, evalueresInput] = useFlatpicker({label: "Evalueres", initialState: moment(), pickrFormat: "d.m.Y", momentFormat: "DD.MM.YYYY"});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/endreDialog/" + oppfolgingsdialogId);
        let params = {fom, tom, evalueres};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <Side tittel={Sider.ENDRE_OPPFOLGINGSDIALOG.tittel}>
            <form onSubmit={handleSubmit}>
                {oppfolgingsdialogIdInput}
                {fomInput}
                {tomInput}
                {evalueresInput}
                <Hovedknapp className='blokk-xs'>Endre</Hovedknapp>
            </form>
            {isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    );
}
