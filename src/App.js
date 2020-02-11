import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {Sider} from "./sider";

export const API_URL = "https://syfomockproxy-q.nav.no";

export default function App() {
    return (
        <Router>
            <Switch>
                {Object.keys(Sider).map(side => (
                    <Route key={side} path={Sider[side].path}>{Sider[side].komponent}</Route>
                ))}
                <Route key="index" path="/">{Sider.OPPRETT_SYKMELDING.komponent}</Route>
            </Switch>
        </Router>
    );
}
