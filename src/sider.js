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
import SettLegacyFelter from "./sider/SettLegacyFelter";
import LeggJournalpostPaKo from "./sider/LeggJournalpostPaKo";
import PlanlagtVarsel from "./sider/PlanlagtVarsel";
import OpprettLegeerklearing from "./sider/OpprettLegeerklearing";
import Dialogmelding from "./sider/Dialogmelding";
import OpprettPapirsykmelding from "./sider/OpprettPapirsykmelding";

export const Sider = {
    OPPRETT_SYKMELDING: {tittel: "Opprett sykmelding", path: "/opprett_sykmelding", komponent: <OpprettSykmelding/>},
    OPPRETT_LEGEERKLEARING: {tittel: "Opprett Legeerklæring", path: "/opprett_legeerklearing", komponent: <OpprettLegeerklearing/>},
    OPPRETT_PAPIRSYKMELDING: {tittel: "Opprett papirsykmelding", path: "/opprett_papirsykmelding", komponent: <OpprettPapirsykmelding/>},
    FINN_AKTORID: {tittel: "Finn aktør-ID fra fødselsnummer", path: "/finn_aktorid", komponent: <FinnAktorId/>},
    FINN_FNR: {tittel: "Finn fødselsnummer fra aktør-ID", path: "/finn_fnr", komponent: <FinnFnr/>},
    NULLSTILL_SYKMELDT: {tittel: "Nullstill sykmeldt", path: "/nullstill_sykmeldt", komponent: <NullstillSykmeldt/>},
    NULLSTILL_MOTEDELTAGER: {tittel: "Nullstill møtedeltager", path: "/nullstill_motedeltager", komponent: <NullstillMote/>},
    NULLSTILL_NAERMESTELEDER: {tittel: "Nullstill nærmeste leder", path: "/nullstill_naermesteleder", komponent: <NullstillNarmesteLeder/>},
    REGISTRER_NAERMESTELEDER: {tittel: "Registrer nærmeste leder", path: "/registrer_naermesteleder", komponent: <RegistrerNaermesteLeder/>},
    SETT_SYKMELDINGSSTATUS: {tittel: "Sett sykmeldingsstatus", path: "/sett_sykmeldingsstatus", komponent: <SettSykmeldingsstatus/>},
    FINN_ARBTAKERE_HOS_ORGNR: {tittel: "Finn arbeidstakere hos org.nummer", path: "/finn_arbtakere_hos_orgnr", komponent: <FinnArbtakereHosOrgnr/>},
    FINN_SYKMELDING_FRA_MOTTAKID: {tittel: "Finn sykmelding fra mottak-ID", path: "/finn_sykmelding_fra_mottakid", komponent: <FinnSykmeldingFraMottakId/>},
    AKTIVITETSKRAV: {tittel: "Registrer aktivitetskrav", path: "/registrer_aktivitetskrav", komponent: <Aktivitetskrav/>},
    SLETT_DIALOGMOTER: {tittel: "Slett dialogmøter", path: "/slett_dialogmoter", komponent: <SlettDialogmoter/>},
    SLETT_MOTEBEHOV: {tittel: "Slett møtebehov", path: "/slett_motebehov", komponent: <SlettMotebehov/>},
    NULLSTILL_MOTEBEHOV: {tittel: "Nullstill møtebehov for bruker", path: "/nullstill_motebehov", komponent: <NullstillMotebehov/>},
    SLETT_VEILEDEROPPGAVER: {tittel: "Slett veilederoppgaver", path: "/slett_veilederoppgaver", komponent: <SlettVeilederoppgaver/>},
    SLETT_OPPFOLGINGSDIALOG: {tittel: "Slett oppfølgingsdialog", path: "/slett_oppfolgingsdialog", komponent: <SlettOppfolgingsdialog/>},
    NULLSTILL_OPPFOLGINGSDIALOG: {tittel: "Nullstill oppfølgingsdialoger for bruker", path: "/nullstill_oppfolgingsdialog", komponent: <NullstillOppfolgingsdialog/>},
    ENDRE_OPPFOLGINGSDIALOG: {tittel: "Endre oppfølgingsdialog", path: "/endre_oppfolgingsdialog", komponent: <EndreOppfolgingsdialog/>},
    PLANLAGT_VARSEL: {tittel: "Planlagt varsel", path: "/planlagt_varsel", komponent: <PlanlagtVarsel/>},
    SETT_LEGACY_I_TILTAK: {tittel: "Sett legacyfelter i tiltak", path: "/sett_legacy_i_tiltak", komponent: <SettLegacyFelter/>},
    LEGG_JOURNALPOST_PA_KO: {tittel: "Legg journalpost (inntektsmelding) på kø", path: "/legg_journalpost_pa_ko", komponent: <LeggJournalpostPaKo/>},
    TESTBRUKERE_STATUS: {tittel: "Testbrukere oversikt", path: "/testbrukere", komponent: <Testbrukere/>},
    DIALOGMELDING: {tittel: "Dialogmelding", path: "/dialogmelding", komponent: <Dialogmelding />},
};
