import React from 'react';
import Lenkepanel from "nav-frontend-lenkepanel";
import {urlForSide} from "./sider/Side";

export const Sider = {
  OPPRETT_SYKMELDING: "Opprett sykmelding",
  FINN_AKTORID: "Finn aktør-ID fra fødselsnummer",
  FINN_FNR: "Finn fødselsnummer fra aktør-ID",
  NULLSTILL_SYKMELDT: "Nullstill sykmeldt",
  NULLSTILL_MOTEDELTAGER: "Nullstill møtedeltager",
  NULLSTILL_NAERMESTELEDER: "Nullstill nærmeste leder",
  REGISTRER_NAERMESTELEDER: "Registrer nærmeste leder",
  SETT_SYKMELDINGSSTATUS: "Sett sykmeldingsstatus",
  FINN_ARBTAKERE_HOS_ORGNR: "Finn arbeidstakere hos org.nummer",
  FINN_SYKMELDING_FRA_MOTTAKID: "Finn sykmelding fra mottak-ID",
  AKTIVITETSKRAV: "Registrer aktivitetskrav",
  SLETT_DIALOGMOTER: "Slett dialogmøter",
  SLETT_MOTEBEHOV: "Slett møtebehov",
  NULLSTILL_MOTEBEHOV: "Nullstill møtebehov for bruker",
  SLETT_VEILEDEROPPGAVER: "Slett veilederoppgaver",
  SLETT_OPPFOLGINGSDIALOG: "Slett oppfølgingsdialog",
  NULLSTILL_OPPFOLGINGSDIALOG: "Nullstill oppfølgingsdialoger for bruker",
  ENDRE_OPPFOLGINGSDIALOG: "Endre oppfølgingsdialog",
  PLANLAGT_VARSEL: "Planlagt varsel",
  SETT_LEGACY_I_TILTAK: "Sett legacyfelter i tiltak",
  LEGG_JOURNALPOST_PA_KO: "Legg journalpost (inntektsmelding) på kø"
};

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
