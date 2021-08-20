import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Checkbox, Select, SkjemaGruppe} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Diagnoser} from "../Diagnoser";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Lukknapp} from 'nav-frontend-ikonknapper';
import {API_URL} from "../App";
import SelectSearch from 'react-select-search'
import {useFlatpicker, useFormPost, useInput, useLocalStorageInput} from "../hooks";
import {Sider} from "../sider";
import Side from "../components/Side/Side";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js'
import '../components/Pickr/flatpickr.less';

function dagDiff(fom, tom) {
    let fomDate = moment(fom);
    let tomDate = moment(tom);
    return tomDate.diff(fomDate, 'days') + 1;
}

function antallPeriodeDager(perioder) {
    return perioder
        .map(periode => dagDiff(periode.fom, periode.tom))
        .reduce((a, b) => a + b, 0);
}


export default function OpprettPapirsykmelding() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const [utenOcr, setUtenOcr] = useState(false);
    const handleUtenOcr = useCallback(() => {
        setUtenOcr(!utenOcr);
    }, [utenOcr]);
    const startdato = moment().subtract(7, 'days');
    const [syketilfelleStartDato, syketilfelleInput] = useFlatpicker({
        label: "Startdato på syketilfelle",
        initialState: startdato,
        tips: "Felt 0"
    });
    const [hpr, hprInput] = useInput({label: "HPR-nummer", initialState: "7125186"});
    const [diagnosekode, setDiagnosekode] = useState("S52.5");
    const [perioder, setPerioder] = useState([{
        "fom": startdato.format("YYYY-MM-DD"),
        "tom": moment().subtract(1, 'days').format("YYYY-MM-DD"),
        "type": "HUNDREPROSENT"
    }]);
    const [periodedager, setPeriodedager] = useState(antallPeriodeDager(perioder));
    const [post, isLoaded, returverdi, error, setIsLoaded, setError] = useFormPost();

    const handlePeriodeChange = (event, idx) => {
        if (event.length === 2) {
            let nyePerioder = perioder;
            nyePerioder[idx].fom = moment(event[0]).format("YYYY-MM-DD");
            nyePerioder[idx].tom = moment(event[1]).format("YYYY-MM-DD");
            let dager = antallPeriodeDager(nyePerioder);
            setPeriodedager(dager);
            setPerioder(nyePerioder);
        }
    };

    const handleTypeChange = (event, idx) => {
        let nyePerioder = perioder;
        nyePerioder[idx].type = event.target.value;
        setPerioder(nyePerioder);
    };

    const fjernPeriode = (event, idx) => {
        event.preventDefault();
        let nyePerioder = perioder;
        console.log(idx);
        nyePerioder.splice(idx, 1);
        let dager = antallPeriodeDager(nyePerioder);
        setPeriodedager(dager);
        setPerioder(nyePerioder);
    };

    const addPeriode = (event) => {
        event.preventDefault();
        let nyePerioder = perioder;
        let sistePeriode = nyePerioder[0];
        let tom = new Date(sistePeriode.fom);
        let fom = new Date(tom);
        fom.setDate(fom.getDate() - 7);
        tom.setDate(tom.getDate() - 1);
        let tomString = moment(tom).format("YYYY-MM-DD");
        let fomString = moment(fom).format("YYYY-MM-DD");
        let periode = {
            fom: fomString,
            tom: tomString,
            type: "HUNDREPROSENT"
        };
        nyePerioder.unshift(periode);
        let dager = antallPeriodeDager(nyePerioder);
        setPerioder(nyePerioder);
        setPeriodedager(dager);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams({
            fnr,
            utenOcr,
            syketilfelleStartDato,
            hpr,
            diagnosekode
        });
        for (let i = 0; i < perioder.length; i++) {
            let idx = i + 1;
            data.append("fom" + idx, perioder[i].fom);
            data.append("tom" + idx, perioder[i].tom);
            data.append("type" + idx, perioder[i].type);

            if (moment(perioder[i].fom) > moment(perioder[i].tom)) {
                setIsLoaded(true);
                setError("Fra-verdi er etter Til-verdi i periode " + idx);
            }
        }
        post(API_URL + "/papirsykmelding/opprett/", data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(false), 3000);
    }, [isLoaded, setIsLoaded]);

    return <Side>
        <div className="flex-container">
            <Undertittel>{Sider.OPPRETT_PAPIRSYKMELDING.tittel}</Undertittel>
        </div>

        <form onSubmit={handleSubmit}>
            {fnrInput}
            {syketilfelleInput}
            <Checkbox
                label="Opprett papirsykmelding uten OCR"
                name="utenOcr"
                key="utenOcr"
                onClick={handleUtenOcr}
                defaultChecked={utenOcr}
            />
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
            {hprInput}

            <div className="flex-container">
                <Knapp className="blokk-xs" htmlType="button" onClick={addPeriode}>Legg til periode</Knapp>
                <div
                    className="flex--end skjemaelement__sporsmal">{isNaN(periodedager) ? "Det er noe feil i periodene!" : periodedager + " dager"}</div>
            </div>
            {perioder.map((periode, idx) => (
                <SkjemaGruppe key={"periode" + (idx + 1)} className="panel panel--border blokk-xs">
                    <div className="flex-container">
                        <div className="periodetittel skjemaelement__sporsmal">{"Periode " + (idx + 1)}</div>
                        {idx < perioder.length - 1 && perioder.length !== 1 ?
                            <Lukknapp className="flex--end" key={"fjern" + (idx + 1)} name={"fjern" + (idx + 1)}
                                      onClick={ev => fjernPeriode(ev, idx)}/> : null}
                    </div>
                    <div className="flex-container">
                        <Flatpickr
                            name={"periode" + (idx + 1)}
                            value={[periode.fom, periode.tom]}
                            onChange={o => handlePeriodeChange(o, idx)}
                            className="skjemaelement__input input--fullbredde blokk-xs"
                            placeholder="dd.mm.yyyy til dd.mm.yyyy"
                            options={{
                                mode: 'range',
                                enableTime: false,
                                dateFormat: 'Y-m-d',
                                altInput: true,
                                altFormat: 'd.m.Y',
                                locale: Norwegian,
                                allowInput: true,
                            }}
                        />
                    </div>
                    <Select label="Type"
                            name={"type" + (idx + 1)}
                            key={"type" + (idx + 1)}
                            selected={periode.type}
                            onChange={ev => handleTypeChange(ev, idx)}
                            className="egenstaende"
                    >
                        <option key='HUNDREPROSENT' value='HUNDREPROSENT'>100%</option>
                        <option key='GRADERT_20' value='GRADERT_20'>20% gradert</option>
                        <option key='GRADERT_40' value='GRADERT_40'>40% gradert</option>
                        <option key='GRADERT_50' value='GRADERT_50'>50% gradert</option>
                        <option key='GRADERT_60' value='GRADERT_60'>60% gradert</option>
                        <option key='GRADERT_80' value='GRADERT_80'>80% gradert</option>
                        <option key='AVVENTENDE' value='AVVENTENDE'>Avventende</option>
                        <option key='GRADERT_REISETILSKUDD' value='GRADERT_REISETILSKUDD'>Gradert reisetilskudd</option>
                        <option key='REISETILSKUDD' value='REISETILSKUDD'>Reisetilskudd</option>
                        <option key='BEHANDLINGSDAGER' value='BEHANDLINGSDAGER'>4 behandlingsdager</option>
                        <option key='BEHANDLINGSDAG' value='BEHANDLINGSDAG'>1 behandlingsdag</option>
                    </Select>
                </SkjemaGruppe>
            ))}
            <Hovedknapp htmlType="submit" className='blokk-xs'>Opprett papirsykmelding</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : null}
    </Side>;
}
