import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Sidetittel} from "nav-frontend-typografi";
import {Sider} from "./sider";
import Lenkepanel from "nav-frontend-lenkepanel";

export const API_URL = "https://syfomock.nais.preprod.local/syfomock";

export default function App() {
    return (
        <Router>
            <Sidetittel className="header">Syfomock</Sidetittel>
            <div className="meny">
                {Object.keys(Sider).map(side => (
                    <Lenkepanel key={side} href={Sider[side].path} className="lenkepanel--liten" tittelProps="normaltekst" border>{Sider[side].tittel}</Lenkepanel>
                ))}
            </div>
            <div className="main">
                <Switch>
                    {Object.keys(Sider).map(side => (
                        <Route key={side} path={Sider[side].path}>{Sider[side].komponent}</Route>
                    ))}
                    <Route key="index" path="/">{Sider.OPPRETT_SYKMELDING.komponent}</Route>
                </Switch>
            </div>
        </Router>
    );
}
