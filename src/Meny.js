import React from 'react';
import Lenkepanel from "nav-frontend-lenkepanel";
import {Sider, urlForSide} from "./sider";

export default class Meny extends React.Component {
  render() {
    return (
        <div className="meny">
          {Object.keys(Sider).map(side => (
              <Lenkepanel key={side} href={urlForSide(side)} className="lenkepanel--liten" tittelProps="normaltekst" border>{Sider[side]}</Lenkepanel>
          ))}
        </div>
    );
  }
}
