import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Meny, {Sider} from "./Meny";
import {Sidetittel} from "nav-frontend-typografi";
import {komponentForSide, urlForSide} from "./sider/Side";

export const API_URL = "https://syfomockproxy-q.nav.no";

export default function App() {
  return (
    <Router>
      <Meny />
      <Sidetittel className="header">Syfomock</Sidetittel>
      <div className="main">
        <Switch>
            {Object.keys(Sider).map(side => (
                <Route key={side} path={urlForSide(side)}>{komponentForSide(side)}</Route>
            ))}
            <Route key="index" path="/">{komponentForSide(Sider.OPPRETT_SYKMELDING)}</Route>
        </Switch>
      </div>
    </Router>
  );
}
