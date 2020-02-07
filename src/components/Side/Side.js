import React from 'react';
import {Sidetittel} from "nav-frontend-typografi";
import Nav from "../Nav/Nav";

export default function Side({children}) {
  return (
    <React.Fragment>
      <Sidetittel className="header">Syfomock</Sidetittel>
      <div className="meny">
        <Nav />
      </div>
      <div className="main">
        { children }
      </div>
    </React.Fragment>
  );
}
