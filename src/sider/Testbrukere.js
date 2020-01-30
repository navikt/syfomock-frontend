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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount() {
        fetch(API_URL + "/testbrukere")
            .then(res => res.text())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    returverdi: result,
                });
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
                { isLoaded ? <code>{returverdi}</code> : <React.Fragment />}
            </React.Fragment>
        );
    }
}

Testbrukere.propTypes = {
    tittel: PropTypes.string
};
