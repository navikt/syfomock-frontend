import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import {API_URL} from "../App";

export default class NullstillSykmeldt extends React.Component {
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
        fetch(API_URL + "/nullstill/" + this.state.value)
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
                    <Input label="Fødselsnummer" onChange={this.handleChange}/>
                    <Hovedknapp className='blokk-xs'>Nullstill</Hovedknapp>
                </form>
                { isLoaded ? <code>{returverdi}</code> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

NullstillSykmeldt.propTypes = {
    tittel: PropTypes.string
};
