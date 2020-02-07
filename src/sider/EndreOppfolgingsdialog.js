import React from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {API_URL} from "../App";
import {useGet, useInput} from "../hooks";
import moment from "moment";
import Side from "../components/Side/Side";

export default function EndreOppfolgingsdialog() {
    const [oppfolgingsdialogId, oppfolgingsdialogIdInput] = useInput({label: "Oppfølgingsdialog-ID"});
    const [fom, fomInput] = useInput({label: "Fom", initialState: moment().subtract(7, "days").format("DD.MM.YYYY")});
    const [tom, tomInput] = useInput({label: "Tom", initialState: moment().format("DD.MM.YYYY")});
    const [evalueres, evalueresInput] = useInput({label: "Evalueres", initialState: moment().format("DD.MM.YYYY")});
    const [get, isLoaded, returverdi, error] = useGet();

    const handleSubmit = (event) => {
        event.preventDefault();
        let url = new URL(API_URL + "/endreDialog/" + oppfolgingsdialogId);
        let params = {fom, tom, evalueres};
        url.search = new URLSearchParams(params).toString();
        get(url.toString());
    };

    return (
        <React.Fragment>
          <Side>
            <Undertittel className='blokk-xs'>{Sider.ENDRE_OPPFOLGINGSDIALOG.tittel}</Undertittel>
            <form onSubmit={handleSubmit}>
                {oppfolgingsdialogIdInput}
                {fomInput}
                {tomInput}
                {evalueresInput}
                <Hovedknapp className='blokk-xs'>Endre</Hovedknapp>
            </form>
            { isLoaded ?
                error === '' ? <AlertStripeSuksess>{returverdi}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : <React.Fragment />}
              </Side>
        </React.Fragment>
    );
}
