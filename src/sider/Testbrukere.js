import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {API_URL} from "../App";

export default class Testbrukere extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            returverdi: '',
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch(API_URL + "/testbrukere")
            .then(res => res.text())
            .then(res => {
                this.setState({isLoaded: true, returverdi: res});
            });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const {returverdi, isLoaded} = this.state;
        return (
            <React.Fragment>
                <Undertittel>{this.props.tittel}</Undertittel>
                <p>Funker dårlig :)</p>
                { isLoaded ? <code>{returverdi}</code> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

Testbrukere.propTypes = {
    tittel: PropTypes.string
};
