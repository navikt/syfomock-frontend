import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Undertittel} from "nav-frontend-typografi";
import {Checkbox, Input, Select, SkjemaGruppe} from "nav-frontend-skjema";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import {Diagnoser} from "../Diagnoser";
import {AlertStripeInfo} from "nav-frontend-alertstriper";
import Lukknapp from "nav-frontend-lukknapp";

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dagDiff(fom, tom) {
    let fomDate = moment(new Date(fom));
    let tomDate = moment(new Date(tom));
    return tomDate.diff(fomDate, 'days')+1;
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


export default class OpprettSykmelding extends React.Component {
    constructor(props) {
        super(props);
        let startDato = new Date();
        startDato.setDate(startDato.getDate()-6);
        let datoString = moment(startDato).format("YYYY-MM-DD");
        this.state = {
            fnr: '',
            eid: randomInteger(1000000000, 99999999999),
            syketilfelleStartDato: datoString,
            identdato: datoString,
            utstedelsesdato: datoString,
            msgid: randomInteger(1000000000, 99999999999),
            diagnosekode: 'L87',
            legefnr: '02125922395',
            smtype: 'SM2013',
            manglendeTilretteleggingPaaArbeidsplassen: false,
            perioder: [
                {
                    "fom": datoString,
                    "tom": moment(new Date()).format("YYYY-MM-DD"),
                    "type": "HUNDREPROSENT"
                }
            ],
            kontaktdato: '',
            begrunnikkekontakt: '',
            returverdi: '',
            periodedager: 0,
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({periodedager: antallPeriodeDager(this.state.perioder)})
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "manglendeTilretteleggingPaaArbeidsplassen") {
            value = event.target.value === "on";
        }
        this.setState({[name]: value});
    }

    handlePeriodeChange(event) {
        let idx = event.target.name[event.target.name.length - 1] - 1;
        let name = event.target.name.slice(0, -1);
        let perioder = this.state.perioder;
        perioder[idx][name] = event.target.value;
        let dager = antallPeriodeDager(perioder);
        this.setState({perioder: perioder, periodedager: dager});
    }

    fjernPeriode(event) {
        let idx = event.target.name[event.target.name.length - 1] - 1;
        let perioder = this.state.perioder;
        console.log(idx);
        perioder.splice(idx, 1);
        let dager = antallPeriodeDager(perioder);
        this.setState({perioder: perioder, periodedager: dager});
        event.preventDefault();
    }

    addPeriode(event) {
        let perioder = this.state.perioder;
        let sistePeriode = perioder[perioder.length - 1];
        let tom = new Date(sistePeriode.fom);
        let fom = new Date(tom);
        fom.setDate(fom.getDate()-7);
        tom.setDate(tom.getDate()-1);
        let tomString = moment(tom).format("YYYY-MM-DD");
        let fomString = moment(fom).format("YYYY-MM-DD");
        let periode = {
            fom: fomString,
            tom: tomString,
            type: "HUNDREPROSENT"
        };
        perioder.push(periode);
        let dager = antallPeriodeDager(perioder);
        this.setState({perioder: perioder, periodedager: dager});
        event.preventDefault();
    }

    handleSubmit(event) {
        const {
            fnr,
            eid,
            syketilfelleStartDato,
            identdato,
            utstedelsesdato,
            msgid,
            diagnosekode,
            legefnr,
            smtype,
            manglendeTilretteleggingPaaArbeidsplassen,
            perioder,
            kontaktdato,
            begrunnikkekontakt
        } = this.state;

        let data = new URLSearchParams();
        data.append("fnr", fnr);
        data.append("eid", eid);
        data.append("syketilfelleStartDato", syketilfelleStartDato);
        data.append("identdato", identdato);
        data.append("utstedelsesdato", utstedelsesdato);
        data.append("msgid", msgid);
        data.append("diagnosekode", diagnosekode);
        data.append("legefnr", legefnr);
        data.append("smtype", smtype);
        data.append("manglendeTilretteleggingPaaArbeidsplassen", manglendeTilretteleggingPaaArbeidsplassen);
        for (let i = 0; i < perioder.length; i++) {
            let idx = i+1;
            data.append("fom"+idx, perioder[i].fom);
            data.append("tom"+idx, perioder[i].tom);
            data.append("type"+idx, perioder[i].type);
        }
        data.append("kontaktdato", kontaktdato);
        data.append("begrunnikkekontakt", begrunnikkekontakt);
        fetch(API_URL + "/nyttmottak/sykmelding/opprett/", {
            method: "POST",
            body: data
        })
            .then(res => res.text())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    returverdi: result,
                });
            });
        event.preventDefault();
    }

    render() {
        const {returverdi, isLoaded} = this.state;
        return (
            <React.Fragment>
                <Undertittel>{this.props.tittel}</Undertittel>
                {moment(finnTidligsteDag(this.state.perioder)) < moment(this.state.syketilfelleStartDato) && this.state.begrunnikkekontakt === ''
                    ? <AlertStripeInfo>Vær klar over tilbakedatering uten begrunnelse!
                        <p className="blokk-xxxs">Startdato på syketilfelle er senere enn tidligste dag registrert i periodene.</p>
                    </AlertStripeInfo>
                    : <React.Fragment />}
                <form onSubmit={this.handleSubmit}>
                    <Input label="Fødselsnummer"
                           name="fnr"
                           key="fnr"
                           onChange={this.handleChange}
                    />
                    <Input label="Startdato på syketilfelle"
                           value={this.state.syketilfelleStartDato}
                           name="syketilfelleStartDato"
                           key="syketilfelleStartDato"
                           onChange={this.handleChange}
                    />
                    <Input label="Identdato"
                           value={this.state.identdato}
                           name="identdato"
                           key="identdato"
                           onChange={this.handleChange}
                    />
                    <Input label="Utstedelsesdato"
                           value={this.state.utstedelsesdato}
                           name="utstedelsesdato"
                           key="utstedelsesdato"
                           onChange={this.handleChange}
                    />
                    <Select label="Diagnose"
                            value={this.state.diagnosekode}
                            name="diagnosekode"
                            key="diagnosekode"
                            onChange={this.handleChange}
                    >
                        {Object.keys(Diagnoser).map(diagnose => (
                            <option key={diagnose} value={diagnose}>{Diagnoser[diagnose]} ({diagnose})</option>
                        ))}
                    </Select>
                    <Input label="Fødselsnummer til lege"
                           value={this.state.legefnr}
                           name="legefnr"
                           key="legefnr"
                           onChange={this.handleChange}
                    />
                    <Select label="Sykmeldingstype"
                            value={this.state.smtype}
                            name="smtype"
                            key="smtype"
                            onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        defaultChecked={this.state.manglendeTilretteleggingPaaArbeidsplassen}
                    />
                    <div className="float--right skjemaelement__sporsmal">{isNaN(this.state.periodedager) ? "Det er noe feil i periodene!" : this.state.periodedager + " dager"}</div>
                    <Knapp className="blokk-xs" onClick={this.addPeriode.bind(this)}>Legg til periode</Knapp>
                    {this.state.perioder.map((periode, idx) => (
                        <SkjemaGruppe key={"periode"+(idx+1)} className="panel panel--border blokk-xs">
                            { idx > 0 ? <Lukknapp className="periodeknapp" key={"fjern"+(idx+1)} name={"fjern"+(idx+1)} onClick={this.fjernPeriode.bind(this)}>Fjern periode</Lukknapp> : <React.Fragment />}
                            <div className="periodetittel skjemaelement__sporsmal">{"Periode "+(idx+1)}</div>
                            <div className="periodepanel">
                                <Input label="Fra"
                                       name={"fom"+(idx+1)}
                                       key={"fom"+(idx+1)}
                                       className="float--left"
                                       value={periode.fom}
                                       onChange={this.handlePeriodeChange.bind(this)}
                                />
                                <Input label="Til"
                                       name={"tom"+(idx+1)}
                                       key={"tom"+(idx+1)}
                                       className="float--right"
                                       value={periode.tom}
                                       onChange={this.handlePeriodeChange.bind(this)}
                                />
                            </div>
                            <Select label="Type"
                                    name={"type"+(idx+1)}
                                    key={"type"+(idx+1)}
                                    selected={periode.type}
                                    onChange={this.handlePeriodeChange.bind(this)}
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
                    <Input label="Tilbakedatering: Kontaktdato (YYYY-MM-DD)"
                           value={this.state.kontaktdato}
                           name="kontaktdato"
                           key="kontaktdato"
                           onChange={this.handleChange}
                    />
                    <Input label="Tilbakedatering: Begrunnelse"
                           value={this.state.begrunnikkekontakt}
                           name="begrunnikkekontakt"
                           key="begrunnikkekontakt"
                           onChange={this.handleChange}
                    />
                    <Hovedknapp className='blokk-xs'>Send sykmelding</Hovedknapp>
                </form>
                { isLoaded ? <AlertStripeInfo>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeInfo> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

OpprettSykmelding.propTypes = {
    tittel: PropTypes.string
};
