import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {getTekst} from "../Nettverk";

export default class RegistrerNaermesteLeder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brukerFnr: '',
            lederFnr: '',
            orgnummer: '',
            telefonnummer: '',
            epost: '',
            aktivFom: '',
            agForskutterer: false,
            returverdi: '',
            isLoaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let {brukerFnr, lederFnr, orgnummer, telefonnummer, epost, aktivFom, agForskutterer} = this.state;
        let url = new URL("/naermesteleder");
        let params = {brukerFnr, lederFnr, orgnummer, telefonnummer, epost, aktivFom, agForskutterer};
        url.search = new URLSearchParams(params).toString();
        this.setState(getTekst(url));
        event.preventDefault();
    }

    render() {
        const {returverdi, isLoaded} = this.state;
        return (
            <React.Fragment>
                <Undertittel>{this.props.tittel}</Undertittel>
                <form onSubmit={this.handleSubmit}>
                    <Input label="Fødselsnummer" onChange={this.handleChange}/>
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
