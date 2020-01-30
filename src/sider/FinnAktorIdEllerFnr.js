import React from 'react';
import PropTypes from 'prop-types';
import {Undertittel} from "nav-frontend-typografi";
import {Input} from "nav-frontend-skjema";
import {Hovedknapp} from "nav-frontend-knapper";
import AlertStripe from "nav-frontend-alertstriper";
import {Sider} from "../Meny";
import {API_URL} from "../App";

const aktorIdEllerFnr = (side) => {
    switch(Sider[side]) {
        case Sider.FINN_AKTORID: return ["Fødselsnummer", "Aktør-ID"];
        case Sider.FINN_FNR: return ["Aktør-ID", "Fødselsnummer"];
        default: return ["", ""];
    }
};

export default class FinnAktorIdEllerFnr extends React.Component {
    finnAktorIdEllerFnr = (side, verdi) => {
        switch(Sider[side]) {
            case Sider.FINN_AKTORID: fetch(API_URL + "/hentAktoerIdByFnr/" + verdi)
                .then(res => res.text())
                .then((result) => {
                        this.setState({
                            isLoaded: true,
                            returverdi: result,
                        });
                    });
                return;
            case Sider.FINN_FNR: fetch(API_URL + "/hentFnrByAktoerId/" + verdi)
                .then(res => res.text())
                .then((result) => {
                        this.setState({
                            isLoaded: true,
                            returverdi: result,
                        })
                    });
                return;
            default: return;
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoaded: false,
            returverdi: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        this.finnAktorIdEllerFnr(this.props.side, this.state.value);
        event.preventDefault();
    }

    render() {
        const { isLoaded, returverdi } = this.state;
        return (
            <React.Fragment>
                <Undertittel>{Sider[this.props.side]}</Undertittel>
                <form onSubmit={this.handleSubmit}>
                    <Input label={aktorIdEllerFnr(this.props.side)[0]} onChange={this.handleChange}/>
                    <Hovedknapp className='blokk-xs'>Hent</Hovedknapp>
                </form>
                { isLoaded ?
                    !returverdi.match(/^[0-9]+$/)
                        ? <AlertStripe type="feil">{returverdi} :(</AlertStripe>
                        : <AlertStripe type="suksess">{aktorIdEllerFnr(this.props.side)[1]}: {returverdi}</AlertStripe>
                    : <React.Fragment />}
            </React.Fragment>
        );
    }
}

FinnAktorIdEllerFnr.propTypes = {
    side: PropTypes.string
};
