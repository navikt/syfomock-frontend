import React, {useEffect, useState} from 'react';
import {Input} from "nav-frontend-skjema";
import {Knapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {AlertStripeFeil, AlertStripeInfo} from "nav-frontend-alertstriper";
import {Sider} from "../sider";
import {parseFetchResponse, useJsonGet} from "../hooks";
import Side from "../components/Side/Side";

export default function PlanlagtVarsel() {
    const [getVarsel, varselLoaded, varsel, varselError, setVarsel] = useJsonGet();
    const [oppdatering, setOppdatering] = useState("");

    useEffect(() => {
        getVarsel(API_URL + "/planlagtVarsel");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (event) => {
        const nextVarsel = varsel.map(o => o.id === parseInt(event.target.id, 10) ? {...o, sendingsdato: event.target.value} : o)
        setVarsel(nextVarsel);
    }

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
    }

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
                        <td><Input defaultValue={varsel.sendingsdato} name={`${varsel.id}`} label="" onChange={handleInput}/><Knapp name={varsel.id}
                                                                                                                                    onClick={handleSend}>Oppdater</Knapp></td>
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
            {oppdatering !== '' ? <AlertStripeInfo>{oppdatering}</AlertStripeInfo> : <React.Fragment/>}
            {varselLoaded ?
                varselError === '' ? renderTabell()
                    : <AlertStripeFeil>{varselError}</AlertStripeFeil>
                : <React.Fragment/>}
        </Side>
    );
};
