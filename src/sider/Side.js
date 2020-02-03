import {Sider} from "../Meny";
import React from "react";
import NullstillSykmeldt from "./NullstillSykmeldt";
import FinnFnr from "./FinnFnr";
import FinnArbtakereHosOrgnr from "./FinnArbtakereHosOrgnr";
import OpprettSykmelding from "./OpprettSykmelding";
import RegistrerNaermesteLeder from "./RegistrerNaermesteLeder";
import FinnAktorId from "./FinnAktorId";
import NullstillMote from "./NullstillMote";
import NullstillNarmesteLeder from "./NullstillNarmesteLeder";
import SettSykmeldingsstatus from "./SettSykmeldingsstatus";
import FinnSykmeldingFraMottakId from "./FinnSykmeldingFraMottakId";
import Aktivitetskrav from "./Aktivitetskrav";
import SlettDialogmoter from "./SlettDialogmoter";
import SlettMotebehov from "./SlettMotebehov";
import NullstillMotebehov from "./NullstillMotebehov";
import SlettVeilederoppgaver from "./SlettVeilederoppgaver";

const Unimplemented = ({ side }) => <code class="sentrert">unimplemented!({side})</code>;

export const urlForSide = (side) => {
    switch(Sider[side]) {
        case Sider.OPPRETT_SYKMELDING: return "/opprett_sykmelding";
        case Sider.FINN_AKTORID: return "/finn_aktorid";
        case Sider.FINN_FNR: return "/finn_fnr";
        case Sider.NULLSTILL_SYKMELDT: return "/nullstill_sykmeldt";
        case Sider.NULLSTILL_MOTEDELTAGER: return "/nullstill_motedeltager";
        case Sider.NULLSTILL_NAERMESTELEDER: return "/nullstill_naermesteleder";
        case Sider.REGISTRER_NAERMESTELEDER: return "/registrer_naermesteleder";
        case Sider.SETT_SYKMELDINGSSTATUS: return "/sett_sykmeldingsstatus";
        case Sider.FINN_ARBTAKERE_HOS_ORGNR: return "/finn_arbtakere_hos_orgnr";
        case Sider.FINN_SYKMELDING_FRA_MOTTAKID: return "/finn_sykmelding_fra_mottakid";
        case Sider.AKTIVITETSKRAV: return "/aktivitetskrav";
        case Sider.SLETT_DIALOGMOTER: return "/slett_dialogmoter";
        case Sider.SLETT_MOTEBEHOV: return "/slett_motebehov";
        case Sider.NULLSTILL_MOTEBEHOV: return "/nullstill_motebehov";
        case Sider.SLETT_VEILEDEROPPGAVER: return "/slett_veilederoppgaver";
        case Sider.SLETT_OPPFOLGINGSDIALOG: return "/slett_oppfolgingsdialog";
        case Sider.NULLSTILL_OPPFOLGINGSDIALOG: return "/nullstill_oppfolgingsdialog";
        case Sider.ENDRE_OPPFOLGINGSDIALOG: return "/endre_oppfolgingsdialog";
        case Sider.PLANLAGT_VARSEL: return "/planlagt_varsel";
        case Sider.SETT_LEGACY_I_TILTAK: return "/sett_legacy_i_tiltak";
        case Sider.LEGG_JOURNALPOST_PA_KO: return "/legg_journalpost_pa_ko";
        default: return "/opprett_sykmelding";
    }
};

export const komponentForSide = (side) => {
    switch(Sider[side]) {
        case Sider.OPPRETT_SYKMELDING: return <OpprettSykmelding />;
        case Sider.FINN_AKTORID: return <FinnAktorId />;
        case Sider.FINN_FNR: return <FinnFnr />;
        case Sider.NULLSTILL_SYKMELDT: return <NullstillSykmeldt />;
        case Sider.NULLSTILL_MOTEDELTAGER: return <NullstillMote />;
        case Sider.NULLSTILL_NAERMESTELEDER: return <NullstillNarmesteLeder />;
        case Sider.REGISTRER_NAERMESTELEDER: return <RegistrerNaermesteLeder />;
        case Sider.SETT_SYKMELDINGSSTATUS: return <SettSykmeldingsstatus  />;
        case Sider.FINN_ARBTAKERE_HOS_ORGNR: return <FinnArbtakereHosOrgnr />;
        case Sider.FINN_SYKMELDING_FRA_MOTTAKID: return <FinnSykmeldingFraMottakId />;
        case Sider.AKTIVITETSKRAV: return <Aktivitetskrav />;
        case Sider.SLETT_DIALOGMOTER: return <SlettDialogmoter />;
        case Sider.SLETT_MOTEBEHOV: return <SlettMotebehov />;
        case Sider.NULLSTILL_MOTEBEHOV: return <NullstillMotebehov />;
        case Sider.SLETT_VEILEDEROPPGAVER: return <SlettVeilederoppgaver />;
        case Sider.SLETT_OPPFOLGINGSDIALOG: return <Unimplemented side={side} />;
        case Sider.NULLSTILL_OPPFOLGINGSDIALOG: return <Unimplemented side={side} />;
        case Sider.ENDRE_OPPFOLGINGSDIALOG: return <Unimplemented side={side} />;
        case Sider.PLANLAGT_VARSEL: return <Unimplemented side={side} />;
        case Sider.SETT_LEGACY_I_TILTAK: return <Unimplemented side={side} />;
        case Sider.LEGG_JOURNALPOST_PA_KO: return <Unimplemented side={side} />;
        default: return <OpprettSykmelding />;
    }
}
