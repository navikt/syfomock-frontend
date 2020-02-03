import React, {useCallback, useState} from 'react';
import moment from 'moment';
import {Undertittel} from "nav-frontend-typografi";
import {Checkbox, Input, Select, SkjemaGruppe} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Diagnoser} from "../Diagnoser";
import {AlertStripeFeil, AlertStripeInfo} from "nav-frontend-alertstriper";
import Lukknapp from "nav-frontend-lukknapp";
import {API_URL} from "../App";
import SelectSearch from 'react-select-search'
import {useFormPost, useInput, useLocalStorage, useLocalStorageInput} from "../hooks";
import {Sider} from "../Meny";

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dagDiff(fom, tom) {
    let fomDate = moment(new Date(fom));
    let tomDate = moment(new Date(tom));
    return tomDate.diff(fomDate, 'days') + 1;
}

function antallPeriodeDager(perioder) {
    return perioder
        .map(periode => dagDiff(periode.fom, periode.tom))
        .reduce((a, b) => a + b, 0);
}

function finnTidligsteDag(perioder) {
    return moment(Math.min(...perioder
        .map(periode => moment(new Date(periode.fom)))))
        .format("YYYY-MM-DD");
}


export default function OpprettSykmelding() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const startdato = moment().subtract(6, 'days').format("YYYY-MM-DD");
    const [syketilfelleStartDato, syketilfelleInput, setSyketilfelleStartDato] = useInput({label: "Startdato på syketilfelle", initialState: startdato});
    const [identdato, identdatoInput, setIdentdato] = useInput({label: "Identdato", initialState: startdato});
    const [utstedelsesdato, utstedelsesdatoInput, setUtstedelsesdato] = useInput({label: "Utstedelsesdato", initialState: startdato});
    const eid = randomInteger(1000000000, 99999999999);
    const msgid = randomInteger(1000000000, 99999999999);
    const [diagnosekode, setDiagnosekode] = useState("L87");
    const [smtype, setSmtype] = useState("SM2013");
    const [legefnr, legefnrInput] = useInput({label: "Fødselsnummer til lege", initialState: "0225922395"});
    const [manglendeTilretteleggingPaaArbeidsplassen, setManglendeTilretteleggingPaaArbeidsplassen] = useState(false);
    const [perioder, setPerioder] = useState([{
        "fom": startdato,
        "tom": moment().format("YYYY-MM-DD"),
        "type": "HUNDREPROSENT"
    }]);
    const [kontaktdato, kontaktdatoInput] = useInput({label: "Tilbakedatering: Kontaktdato (YYYY-MM-DD)"});
    const [begrunnikkekontakt, begrunnikkekontaktInput] = useInput({label: "Tilbakedatering: Begrunnelse"});
    const [periodedager, setPeriodedager] = useState(antallPeriodeDager(perioder));
    const [simple, setSimple] = useLocalStorage('simple-mode', true);
    const [post, isLoaded, returverdi, error, setIsLoaded, setError] = useFormPost();

    const handleManglendeTilretteleggingPaaArbeidsplassen = useCallback(() => {
        setManglendeTilretteleggingPaaArbeidsplassen(!manglendeTilretteleggingPaaArbeidsplassen);
    }, [manglendeTilretteleggingPaaArbeidsplassen]);

    const handlePeriodeChange = (event) => {
        let idx = event.target.name[event.target.name.length - 1] - 1;
        let name = event.target.name.slice(0, -1);
        let nyePerioder = perioder;
        nyePerioder[idx][name] = event.target.value;
        let dager = antallPeriodeDager(nyePerioder);
        setPeriodedager(dager);
        setPerioder(nyePerioder);
    };

    const fjernPeriode = (event) => {
        event.preventDefault();
        let idx = event.target.name[event.target.name.length - 1] - 1;
        let nyePerioder = perioder;
        console.log(idx);
        nyePerioder.splice(idx, 1);
        let dager = antallPeriodeDager(nyePerioder);
        setPeriodedager(dager);
        setPerioder(nyePerioder);
    };

    const handleSimple = useCallback(() => {
        if (simple) {
            let tidligsteDag = finnTidligsteDag(perioder);
            setSyketilfelleStartDato(tidligsteDag);
            setIdentdato(tidligsteDag);
            setUtstedelsesdato(tidligsteDag);
            setSimple(false);
        } else {
            setSimple(true);
        }
    }, [simple, setSimple, perioder, setSyketilfelleStartDato, setIdentdato, setUtstedelsesdato]);

    const addPeriode = (event) => {
        event.preventDefault();
        let nyePerioder = perioder;
        let sistePeriode = nyePerioder[nyePerioder.length - 1];
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
        nyePerioder.push(periode);
        let dager = antallPeriodeDager(nyePerioder);
        setPerioder(nyePerioder);
        setPeriodedager(dager);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let sdato = syketilfelleStartDato;
        let idato = identdato;
        let udato = utstedelsesdato;

        let data = new URLSearchParams();
        if (simple) {
            let tidligsteDag = finnTidligsteDag(perioder);
            sdato = tidligsteDag;
            idato = tidligsteDag;
            udato = tidligsteDag;

        }
        data.append("fnr", fnr);
        data.append("eid", eid);
        data.append("syketilfelleStartDato", sdato);
        data.append("identdato", idato);
        data.append("utstedelsesdato", udato);
        data.append("msgid", msgid);
        data.append("diagnosekode", diagnosekode);
        data.append("legefnr", legefnr);
        data.append("smtype", smtype);
        data.append("manglendeTilretteleggingPaaArbeidsplassen", manglendeTilretteleggingPaaArbeidsplassen.toString());
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
        data.append("kontaktdato", kontaktdato);
        data.append("begrunnikkekontakt", begrunnikkekontakt);
        post(API_URL + "/nyttmottak/sykmelding/opprett/", data);
    };

    return <React.Fragment>
        <Undertittel>{Sider.OPPRETT_SYKMELDING}</Undertittel>
        <Checkbox
            label="Simple mode"
            name="simple"
            key="simple"
            className="flex--right"
            onChange={handleSimple}
            defaultChecked={simple}
        />
        {simple &&
        <AlertStripeInfo className="blokk-xs">Simple mode bruker tidligste dag i periodene som startdato på syketilfelle, identdato og utstedelsesdato.</AlertStripeInfo>}
        {!simple && moment(finnTidligsteDag(perioder)) < moment(syketilfelleStartDato) && begrunnikkekontakt === ''
            ? <AlertStripeInfo className="blokk-xs">Vær klar over tilbakedatering uten begrunnelse!
                <p className="blokk-xxxs">Startdato på syketilfelle er senere enn tidligste dag registrert i periodene.</p>
            </AlertStripeInfo>
            : <React.Fragment/>}
        <form onSubmit={handleSubmit}>
            {fnrInput}
            {!simple &&
            <React.Fragment>
                {syketilfelleInput}
                {identdatoInput}
                {utstedelsesdatoInput}
                <div className="skjemaelement">
                    <label className="skjemaelement__label" htmlFor="diagnosekode">Diagnosekode</label>
                    <SelectSearch options={Object.keys(Diagnoser).map(diagnose => ({name: `${Diagnoser[diagnose]} (${diagnose})`, value: diagnose}))}
                                  value={diagnosekode}
                                  name="diagnosekode"
                                  key="diagnosekode"
                                  onChange={e => setDiagnosekode(e.value)}
                    />
                </div>
                {legefnrInput}
                <Select label="Sykmeldingstype"
                        value={smtype}
                        name="smtype"
                        key="smtype"
                        onChange={e => setSmtype(e.target.value)}
                >
                    <option key="SM2013" value="SM2013">SM2013 (V1)</option>
                    <option key="SM2013_diagnoseogfraværsgrunn" value="SM2013_diagnoseogfraværsgrunn">SM2013_diagnoseogfraværsgrunn</option>
                    <option key="SM2013_forenklet" value="SM2013_forenklet">SM2013_forenklet</option>
                    <option key="SM2013_NAV_Arbeidsgiver_Melding" value="SM2013_NAV_Arbeidsgiver_Melding">SM2013_NAV_Arbeidsgiver_Melding</option>
                    <option key="SM2013_normal" value="SM2013_normal">SM2013_normal</option>
                    <option key="SM2013_uten_arbeidsgiver" value="SM2013_uten_arbeidsgiver">SM2013_uten_arbeidsgiver</option>
                    <option key="SM2013_7uker" value="SM2013_7uker">SM2013_7uker (V2)</option>
                    <option key="SM2013_7uker_flere_perioder" value="SM2013_7uker_flere_perioder">SM2013_7uker_flere_perioder (V2)</option>
                    <option key="SM2013_alle_felter" value="SM2013_alle_felter">SM2013_alle_felter (V2)</option>
                    <option key="SM2013_Påfølgende_17uker" value="SM2013_Påfølgende_17uker">SM2013_Påfølgende_17uker (V2)</option>
                    <option key="SM2013_Påfølgende_39uker" value="SM2013_Påfølgende_39uker">SM2013_Påfølgende_39uker (V2)</option>
                    <option key="SM2013_Påfølgende_39uker_med_AAP" value="SM2013_Påfølgende_39uker_med_AAP">SM2013_Påfølgende_39uker_med_AAP (V2)</option>
                </Select>
                <Checkbox
                    label="Manglende tilrettelegging på arbeidsplassen"
                    name="manglendeTilretteleggingPaaArbeidsplassen"
                    key="manglendeTilretteleggingPaaArbeidsplassen"
                    onClick={handleManglendeTilretteleggingPaaArbeidsplassen}
                    defaultChecked={manglendeTilretteleggingPaaArbeidsplassen}
                />
            </React.Fragment>}
            <div
                className="float--right skjemaelement__sporsmal">{isNaN(periodedager) ? "Det er noe feil i periodene!" : periodedager + " dager"}</div>
            <Knapp className="blokk-xs" onClick={addPeriode}>Legg til periode</Knapp>
            {perioder.map((periode, idx) => (
                <SkjemaGruppe key={"periode" + (idx + 1)} className="panel panel--border blokk-xs">
                    {idx > 0 ? <Lukknapp className="periodeknapp" key={"fjern" + (idx + 1)} name={"fjern" + (idx + 1)} onClick={fjernPeriode}>Fjern
                        periode</Lukknapp> : <React.Fragment/>}
                    <div className="periodetittel skjemaelement__sporsmal">{"Periode " + (idx + 1)}</div>
                    <div className="periodepanel">
                        <Input label="Fra"
                               name={"fom" + (idx + 1)}
                               key={"fom" + (idx + 1)}
                               className="float--left"
                               value={periode.fom}
                               onChange={handlePeriodeChange}
                        />
                        <Input label="Til"
                               name={"tom" + (idx + 1)}
                               key={"tom" + (idx + 1)}
                               className="float--right"
                               value={periode.tom}
                               onChange={handlePeriodeChange}
                        />
                    </div>
                    <Select label="Type"
                            name={"type" + (idx + 1)}
                            key={"type" + (idx + 1)}
                            selected={periode.type}
                            onChange={handlePeriodeChange}
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
            {!simple &&
            <React.Fragment>
                {kontaktdatoInput}
                {begrunnikkekontaktInput}
            </React.Fragment>
            }
            <Hovedknapp className='blokk-xs'>Send sykmelding</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeInfo>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeInfo>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : <React.Fragment/>}
    </React.Fragment>;
}
