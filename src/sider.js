import React from "react";
import NullstillSykmeldt from "./sider/NullstillSykmeldt";
import FinnFnr from "./sider/FinnFnr";
import FinnArbtakereHosOrgnr from "./sider/FinnArbtakereHosOrgnr";
import OpprettSykmelding from "./sider/OpprettSykmelding";
import RegistrerNaermesteLeder from "./sider/RegistrerNaermesteLeder";
import FinnAktorId from "./sider/FinnAktorId";
import NullstillMote from "./sider/NullstillMote";
import NullstillNarmesteLeder from "./sider/NullstillNarmesteLeder";
import SettSykmeldingsstatus from "./sider/SettSykmeldingsstatus";
import FinnSykmeldingFraMottakId from "./sider/FinnSykmeldingFraMottakId";
import Aktivitetskrav from "./sider/Aktivitetskrav";
import SlettDialogmoter from "./sider/SlettDialogmoter";
import SlettMotebehov from "./sider/SlettMotebehov";
import NullstillMotebehov from "./sider/NullstillMotebehov";
import SlettVeilederoppgaver from "./sider/SlettVeilederoppgaver";
import SlettOppfolgingsdialog from "./sider/SlettOppfolgingsdialog";
import Testbrukere from "./sider/Testbrukere";
import NullstillOppfolgingsdialog from "./sider/NullstillOppfolgingsdialog";
import EndreOppfolgingsdialog from "./sider/EndreOppfolgingsdialog";

const Unimplemented = ({ side }) => <code class="sentrert">unimplemented!({side})</code>;

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
    LEGG_JOURNALPOST_PA_KO: "Legg journalpost (inntektsmelding) på kø",
    TESTBRUKERE_STATUS: "Testbrukere oversikt"
};

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
        case Sider.TESTBRUKERE_STATUS: return "/testbrukere";
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
        case Sider.SLETT_OPPFOLGINGSDIALOG: return <SlettOppfolgingsdialog />;
        case Sider.NULLSTILL_OPPFOLGINGSDIALOG: return <NullstillOppfolgingsdialog />;
        case Sider.ENDRE_OPPFOLGINGSDIALOG: return <EndreOppfolgingsdialog />;
        case Sider.PLANLAGT_VARSEL: return <Unimplemented side={side} />;
        case Sider.SETT_LEGACY_I_TILTAK: return <Unimplemented side={side} />;
        case Sider.LEGG_JOURNALPOST_PA_KO: return <Unimplemented side={side} />;
        case Sider.TESTBRUKERE_STATUS: return <Testbrukere />;
        default: return <OpprettSykmelding />;
    }
}
