import React from 'react';
import {Sidetittel, Undertittel} from "nav-frontend-typografi";
import Nav from "../Nav/Nav";

export default function Side({children, tittel}) {
    return (
        <React.Fragment>
            <Sidetittel className="header">Syfomock</Sidetittel>
            <div className="meny">
                <Nav/>
            </div>
            <div className="main">
                {tittel && <Undertittel className='blokk-xs'>{tittel}</Undertittel>}
                {children}
            </div>
        </React.Fragment>
    );
}
