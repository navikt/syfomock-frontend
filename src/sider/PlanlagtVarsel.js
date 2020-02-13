import React, {useEffect, useState} from 'react';
import {Knapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {parseFetchResponse, useJsonGet} from "../hooks";
import Side from "../components/Side/Side";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js'
import '../components/Pickr/flatpickr.less';
import moment from "moment";

export default function PlanlagtVarsel() {
    const [getVarsel, varselLoaded, varsel, varselError, setVarsel] = useJsonGet();
    const [oppdatering, setOppdatering] = useState("");

    useEffect(() => {
        getVarsel(API_URL + "/planlagtVarsel");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (dato, id) => {
        const nextVarsel = varsel.map(o => o.id === id ? {...o, sendingsdato: moment(dato[0]).format("YYYY-MM-DD")} : o);
        setVarsel(nextVarsel);
    };

    const handleSend = (event) => {
        event.preventDefault();
        const varselObjekt = varsel.filter(o => o.id === parseInt(event.target.name, 10))[0];
        fetch(API_URL + "/planlagtVarsel/" + varselObjekt.id, {
            method: "POST",
            body: new URLSearchParams({sendingsdato: varselObjekt.sendingsdato})
        })
            .then(res => parseFetchResponse(res, "text"))
            .then((res) => {
                setOppdatering(res.body);
            })
    };

    const renderTabell = () => {
        return (
            <table className="tabell tabell--stripet">
                <thead>
                <tr>
                    <th>Varsel-ID</th>
                    <th>Sendingsdato</th>
                    <th>Varseltype</th>
                    <th>Bruker</th>
                    <th>Ressurs-ID</th>
                </tr>
                </thead>
                <tbody>
                {varsel.map(varsel =>
                    <tr key={varsel.id}>
                        <td>{varsel.id}</td>
                        <td>
                            <Flatpickr
                                name={varsel.id}
                                onChange={o => handleInput(o, varsel.id)}
                                value={varsel.sendingsdato}
                                className="skjemaelement__input input--s"
                                placeholder="dd.mm.yyyy"
                                options={{
                                    mode: 'single',
                                    enableTime: false,
                                    dateFormat: 'Y-m-d',
                                    altInput: true,
                                    altFormat: 'd.m.Y',
                                    locale: Norwegian,
                                    allowInput: true
                                }}
                            />
                            <Knapp name={varsel.id}
                                   onClick={handleSend}>Oppdater</Knapp>
                        </td>
                        <td>{varsel.type}</td>
                        <td>{varsel.bruker}</td>
                        <td>{varsel.ressursId}</td>
                    </tr>)
                }
                </tbody>
            </table>
        )
    }

    return (
        <Side tittel={Sider.PLANLAGT_VARSEL.tittel}>
            {oppdatering !== '' ? <AlertStripeInfo>{oppdatering}</AlertStripeInfo> : null}
            {varselLoaded ?
                varselError === '' ? renderTabell()
                    : <AlertStripeFeil>{varselError}</AlertStripeFeil>
                : null}
        </Side>
    );
};
