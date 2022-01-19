import React, {useCallback, useEffect, useState} from 'react';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {Diagnoser} from "../Diagnoser";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {API_URL} from "../App";
import SelectSearch from 'react-select-search'
import {useFormPost, useInput, useLocalStorageInput} from "../hooks";
import {Sider} from "../sider";
import Side from "../components/Side/Side";
import '../components/Pickr/flatpickr.less';
import {Checkbox} from "nav-frontend-skjema";

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function OpprettLegeerklearing() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer til pasient", key: "fnr"});
    const eid = randomInteger(1000000000, 99999999999);
    const [msgid, msgidInput] = useInput({
        label: "msgId",
        initialState: randomInteger(1000000000, 99999999999),
        tips: "For sporing i loggene!"
    });
    const [diagnosekode, setDiagnosekode] = useState("L87");
    const [legefnr, legefnrInput] = useInput({label: "Fødselsnummer til lege", initialState: "01117302624"});
    const [post, isLoaded, returverdi, error, setIsLoaded] = useFormPost();
    const [statuspresens, statuspresensInput] = useInput({label: "statuspresens"});
    const [vedlegg, setVedlegg] = useState(false);

    const handleVedlegg = useCallback(() => {
        setVedlegg(!vedlegg);
    }, [vedlegg]);

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams({
            fnr,
            eid,
            msgid,
            diagnosekode,
            legefnr,
            statuspresens,
            vedlegg
        });

        post(API_URL + "/legerklaring/opprett/", data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(false), 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    return <Side>
        <div className="flex-container">
            <Undertittel>{Sider.OPPRETT_LEGEERKLEARING.tittel}</Undertittel>
        </div>
        <form onSubmit={handleSubmit}>
            {fnrInput}
            {
                <>
                    <div className="skjemaelement">
                        <div className="flex-container">
                            <label className="skjemaelement__label" htmlFor="diagnosekode">Diagnosekode</label>
                            <Undertekst className="flex--end">Skriv "tullekode" for å få en kode som vil bli avslått i
                                systemet!</Undertekst>
                        </div>
                        <SelectSearch options={Object.keys(Diagnoser).map(diagnose => ({
                            name: `${Diagnoser[diagnose]} (${diagnose})`,
                            value: diagnose
                        }))}
                                      value={diagnosekode}
                                      name="diagnosekode"
                                      key="diagnosekode"
                                      onChange={e => {
                                          setDiagnosekode(e.value)
                                      }}
                        />
                    </div>
                    {legefnrInput}
                    {msgidInput}
                    {statuspresensInput}
                    <Checkbox
                        label="Vedlegg"
                        name="vedlegg"
                        key="vedlegg"
                        onClick={handleVedlegg}
                        defaultChecked={vedlegg}
                    />
                </>
            }
            <Hovedknapp htmlType="button" onClick={handleSubmit} className='blokk-xs'>Send Legeerklearing</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : null}
    </Side>;
}
