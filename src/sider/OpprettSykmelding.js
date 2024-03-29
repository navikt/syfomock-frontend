import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {Undertekst, Undertittel} from "nav-frontend-typografi";
import {Checkbox, Select, SkjemaGruppe} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {Diagnoser} from "../Diagnoser";
import {AlertStripeFeil, AlertStripeInfo, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {Lukknapp} from 'nav-frontend-ikonknapper';
import {API_URL} from "../App";
import SelectSearch from 'react-select-search'
import {useFormPost, useInput, useLocalStorage, useLocalStorageInput, useFlatpicker} from "../hooks";
import {Sider} from "../sider";
import Side from "../components/Side/Side";
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js'
import '../components/Pickr/flatpickr.less';

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

function finnTidligsteDag(perioder) {
    return moment(Math.min(...perioder
        .map(periode => moment(periode.fom))))
        .format("YYYY-MM-DD");
}


export default function OpprettSykmelding() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer", key: "fnr"});
    const startdato = moment().subtract(7, 'days');
    const [syketilfelleStartDato, syketilfelleInput, setSyketilfelleStartDato] = useFlatpicker({label: "Startdato på syketilfelle", initialState: startdato, tips: "Felt 0"});
    const [identdato, identdatoInput, setIdentdato] = useFlatpicker({label: "Identdato", initialState: startdato, tips: "Fra Infotrygd"});
    const [utstedelsesdato, utstedelsesdatoInput, setUtstedelsesdato] = useFlatpicker({label: "Behandlingsdato", initialState: startdato, tips: "Også kalt utstedelsesdato"});
    const eid = randomInteger(1000000000, 99999999999);
    const [msgid, msgidInput] = useInput({label: "msgId", initialState: randomInteger(1000000000, 99999999999), tips: "For sporing i loggene!"});
    const [herid, heridInput] = useInput({label: "herId", initalState: "", tips: "For å slå opp riktig samhandler i TSS/Sar"});
    const [diagnosekode, setDiagnosekode] = useState("L87");
    const [smtype, setSmtype] = useState("SM2013");
    const [annenFravaersaarsak, setAnnenFravarsarsak] = useState("");
    const [legefnr, legefnrInput] = useInput({label: "Fødselsnummer til lege", initialState: "01117302624"});
    const [manglendeTilretteleggingPaaArbeidsplassen, setManglendeTilretteleggingPaaArbeidsplassen] = useState(false);
    const [vedlegg, setVedlegg] = useState(false);
    const [perioder, setPerioder] = useState([{
        "fom": startdato.format("YYYY-MM-DD"),
        "tom": moment().subtract(1, 'days').format("YYYY-MM-DD"),
        "type": "HUNDREPROSENT"
    }]);
    const [kontaktdato, kontaktdatoInput] = useFlatpicker({label: "Tilbakedatering: Kontaktdato", initialState: "", optional:true});
    const [begrunnikkekontakt, begrunnikkekontaktInput] = useInput({label: "Tilbakedatering: Begrunnelse"});
    const [periodedager, setPeriodedager] = useState(antallPeriodeDager(perioder));
    const [simple, setSimple] = useLocalStorage('simple-mode', true);
    const [post, isLoaded, returverdi, error, setIsLoaded, setError] = useFormPost();

    const handleManglendeTilretteleggingPaaArbeidsplassen = useCallback(() => {
        setManglendeTilretteleggingPaaArbeidsplassen(!manglendeTilretteleggingPaaArbeidsplassen);
    }, [manglendeTilretteleggingPaaArbeidsplassen]);

    const handleVedlegg = useCallback(() => {
        setVedlegg(!vedlegg);
    }, [vedlegg]);

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
        let sdato = syketilfelleStartDato;
        let idato = identdato;
        let udato = utstedelsesdato;

        if (simple) {
            let tidligsteDag = finnTidligsteDag(perioder);
            sdato = tidligsteDag;
            idato = tidligsteDag;
            udato = tidligsteDag;

        }
        let data = new URLSearchParams({
            fnr: fnr.trim(),
            eid,
            syketilfelleStartDato: sdato,
            identdato: idato,
            utstedelsesdato: udato,
            msgid,
            herid,
            diagnosekode,
            legefnr,
            smtype,
            manglendeTilretteleggingPaaArbeidsplassen,
            vedlegg,
            kontaktdato,
            begrunnikkekontakt,
            annenFravaersaarsak
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
        post(API_URL + "/nyttmottak/sykmelding/opprett/", data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(false), 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    return <Side>
        <div className="flex-container">
            <Undertittel>{Sider.OPPRETT_SYKMELDING.tittel}</Undertittel>
            <Checkbox
                label="Simple mode"
                name="simple"
                key="simple"
                className="flex--end"
                onChange={handleSimple}
                defaultChecked={simple}
            />
        </div>
        {simple &&
        <AlertStripeInfo className="blokk-xs">Simple mode bruker tidligste dag i periodene som startdato på syketilfelle, identdato og utstedelsesdato.</AlertStripeInfo>}
        {!simple && moment(finnTidligsteDag(perioder)) < moment(syketilfelleStartDato) && begrunnikkekontakt === ''
            ? <AlertStripeInfo className="blokk-xs">Vær klar over tilbakedatering uten begrunnelse!
                <p className="blokk-xxxs">Startdato på syketilfelle er senere enn tidligste dag registrert i periodene.</p>
            </AlertStripeInfo>
            : null}
        <form onSubmit={handleSubmit}>
            {fnrInput}
            {!simple &&
            <>
                {syketilfelleInput}
                {identdatoInput}
                {utstedelsesdatoInput}
                <div className="skjemaelement">
                    <div className="flex-container">
                        <label className="skjemaelement__label" htmlFor="diagnosekode">Diagnosekode</label>
                        <Undertekst className="flex--end">Skriv "tullekode" for å få en kode som vil bli avslått i systemet!</Undertekst>
                    </div>
                    <SelectSearch options={Object.keys(Diagnoser).map(diagnose => ({name: `${Diagnoser[diagnose]} (${diagnose})`, value: diagnose}))}
                                  value={diagnosekode}
                                  name="diagnosekode"
                                  key="diagnosekode"
                                  onChange={e => {
                                      setDiagnosekode(e.value)
                                  }}
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

                <Select label="Annen fraværsårsak"
                        value={annenFravaersaarsak}
                        name="annenFravaersaarsak"
                        key="annenFravaersaarsak"
                        onChange={e => setAnnenFravarsarsak(e.target.value)}
                >
                    <option key="FRAVAER_0" value="">Ingen</option>
                    <option key="FRAVAER_1" value="1">Når vedkommende er innlagt i en godkjent helseinstitusjon</option>
                    <option key="FRAVAER_2" value="2">Når vedkommende er under behandling og legen erklærer at behandlingen gjør det nødvendig at vedkommende ikke arbeider</option>
                    <option key="FRAVAER_3" value="3">Når vedkommende deltar på et arbeidsrettet tiltak</option>
                    <option key="FRAVAER_4" value="4">Når vedkommende på grunn av sykdom, skade eller lyte får tilskott når vedkommende på grunn av sykdom, skade eller lyte får tilskott</option>
                    <option key="FRAVAER_5" value="5">Når vedkommende er til nødvendig kontrollundersøkelse som krever minst 24 timers fravær, reisetid medregnet</option>
                    <option key="FRAVAER_6" value="6">Når vedkommende myndighet har nedlagt forbud mot at han eller hun arbeider på grunn av smittefare</option>
                    <option key="FRAVAER_7" value="7">Når vedkommende er arbeidsufør som følge av svangerskapsavbrudd</option>
                    <option key="FRAVAER_8" value="8">Når vedkommende er arbeidsufør som følge av behandling for barnløshet</option>
                    <option key="FRAVAER_9" value="9">Når vedkommende er donor eller er under vurdering som donor</option>
                    <option key="FRAVAER_10" value="10">Når vedkommende er arbeidsufør som følge av behandling i forbindelse med sterilisering</option>
                </Select>


                <Checkbox
                    label="Manglende tilrettelegging på arbeidsplassen"
                    name="manglendeTilretteleggingPaaArbeidsplassen"
                    key="manglendeTilretteleggingPaaArbeidsplassen"
                    onClick={handleManglendeTilretteleggingPaaArbeidsplassen}
                    defaultChecked={manglendeTilretteleggingPaaArbeidsplassen}
                />
                <Checkbox
                    label="Vedlegg"
                    name="vedlegg"
                    key="vedlegg"
                    onClick={handleVedlegg}
                    defaultChecked={vedlegg}
                />
                {kontaktdatoInput}
                {begrunnikkekontaktInput}
                {msgidInput}
                {heridInput}
            </>
            }
            <div className="flex-container">
                <Knapp className="blokk-xs" htmlType="button" onClick={addPeriode}>Legg til periode</Knapp>
                <div className="flex--end skjemaelement__sporsmal">{isNaN(periodedager) ? "Det er noe feil i periodene!" : periodedager + " dager"}</div>
            </div>
            {perioder.map((periode, idx) => (
                <SkjemaGruppe key={"periode" + (idx + 1)} className="panel panel--border blokk-xs">
                    <div className="flex-container">
                        <div className="periodetittel skjemaelement__sporsmal">{"Periode " + (idx + 1)}</div>
                        {idx < perioder.length-1 && perioder.length !== 1 ? <Lukknapp className="flex--end" key={"fjern" + (idx + 1)} name={"fjern" + (idx + 1)} onClick={ev => fjernPeriode(ev, idx)} /> : null}
                    </div>
                    <div className="flex-container">
                        <Flatpickr
                            name={"periode" + (idx+1)}
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
            <Hovedknapp htmlType="button" onClick={handleSubmit} className='blokk-xs'>Send sykmelding</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : null}
    </Side>;
}
