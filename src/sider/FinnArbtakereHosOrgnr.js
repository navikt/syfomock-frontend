import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";

export default class FinnArbtakereHosOrgnr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
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
        let url = new URL(API_URL + "/arbeidstakere");
        let params = {orgnummer: this.state.value};
        url.search = new URLSearchParams(params).toString();
        fetch(url)
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
                <form onSubmit={this.handleSubmit}>
                    <Input label="Organisasjonsnummer" onChange={this.handleChange}/>
                    <Hovedknapp className='blokk-xs'>Finn arbeidstakere</Hovedknapp>
                </form>
                { isLoaded ? <code>{returverdi}</code> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

FinnArbtakereHosOrgnr.propTypes = {
    tittel: PropTypes.string
};
