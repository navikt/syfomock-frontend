import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {Checkbox, Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";
import moment from "moment";

export default class RegistrerNaermesteLeder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brukerFnr: '',
            lederFnr: '',
            orgnummer: '',
            telefonnummer: '',
            epost: '',
            aktivFom: moment(new Date()).format("YYYY-MM-DD"),
            agForskutterer: false,
            returverdi: '',
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (name === "agForskutterer") {
            value = event.target.value === "on";
        }
        this.setState({[name]: value});
    }

    handleSubmit(event) {
        let {brukerFnr, lederFnr, orgnummer, telefonnummer, epost, aktivFom, agForskutterer} = this.state;
        let url = new URL("/naermesteleder");
        let params = {brukerFnr, lederFnr, orgnummer, telefonnummer, epost, aktivFom, agForskutterer};
        url.search = new URLSearchParams(params).toString();
        fetch(API_URL + url)
            .then(res => res.text())
            .then(res => {
                this.setState({isLoaded: true, returverdi: res});
            });
        event.preventDefault();
    }

    render() {
        const {returverdi, isLoaded} = this.state;
        return (
            <React.Fragment>
                <Undertittel>{this.props.tittel}</Undertittel>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Fødselsnummer til ansatt"
                           value={this.state.brukerFnr}
                           name="brukerFnr"
                           key="brukerFnr"
                           onChange={this.handleChange}
                    />
                    <Input label="Fødselsnummer til ny nærmeste leder"
                           value={this.state.lederFnr}
                           name="lederFnr"
                           key="lederFnr"
                           onChange={this.handleChange}
                    />
                    <Input label="Organisasjonsnummer"
                           value={this.state.orgnummer}
                           name="orgnummer"
                           key="orgnummer"
                           onChange={this.handleChange}
                    />
                    <Input label="Telefonnummer til ny nærmeste leder"
                           value={this.state.telefonnummer}
                           name="telefonnummer"
                           key="telefonnummer"
                           onChange={this.handleChange}
                    />
                    <Input label="E-post til ny nærmeste leder"
                           value={this.state.epost}
                           name="epost"
                           key="epost"
                           onChange={this.handleChange}
                    />
                    <Input label="Aktiv fra og med"
                           value={this.state.aktivFom}
                           name="aktivFom"
                           key="aktivFom"
                           onChange={this.handleChange}
                    />
                    <Checkbox
                        label="Arbeidsgiver forskutterer"
                        name="agForskutterer"
                        key="agForskutterer"
                        onChange={this.handleChange}
                        defaultChecked={this.state.agForskutterer}
                    />
                    <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
                </form>
                { isLoaded ? <code>{returverdi}</code> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

RegistrerNaermesteLeder.propTypes = {
    tittel: PropTypes.string
};
