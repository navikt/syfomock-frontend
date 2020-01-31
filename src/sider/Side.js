import {Sider} from "../Meny";
import React from "react";
import NullstillSykmeldt from "./NullstillSykmeldt";
import FinnAktorIdEllerFnr from "./FinnAktorIdEllerFnr";
import FinnArbtakereHosOrgnr from "./FinnArbtakereHosOrgnr";
import Testbrukere from "./Testbrukere";
import OpprettSykmelding from "./OpprettSykmelding";

const Unimplemented = ({ side }) => <code>unimplemented!({side})</code>;

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
        case Sider.SLETT_VEILEDEROPPGAVER: return "/slett_veilederoppgaver";
        case Sider.SLETT_OPPFOLGINGSDIALOG: return "/slett_oppfolgingsdialog";
        case Sider.ENDRE_OPPFOLGINGSDIALOG: return "/endre_oppfolgingsdialog";
        case Sider.PLANLAGT_VARSEL: return "/planlagt_varsel";
        case Sider.TESTBRUKERE_STATUS: return "/testbrukere_status";
        case Sider.SETT_LEGACY_I_TILTAK: return "/sett_legacy_i_tiltak";
        case Sider.LEGG_JOURNALPOST_PA_KO: return "/legg_journalpost_pa_ko";
        default: return "/opprett_sykmelding";
    }
};

export const komponentForSide = (side) => {
    switch(Sider[side]) {
        case Sider.OPPRETT_SYKMELDING: return <OpprettSykmelding tittel={Sider[side]} />;
        case Sider.FINN_AKTORID: return <FinnAktorIdEllerFnr side={side} />;
        case Sider.FINN_FNR: return <FinnAktorIdEllerFnr side={side} />;
        case Sider.NULLSTILL_SYKMELDT: return <NullstillSykmeldt tittel={Sider[side]}/>;
        case Sider.NULLSTILL_MOTEDELTAGER: return <Unimplemented side={side} />;
        case Sider.NULLSTILL_NAERMESTELEDER: return <Unimplemented side={side} />;
        case Sider.REGISTRER_NAERMESTELEDER: return <Unimplemented side={side} />;
        case Sider.SETT_SYKMELDINGSSTATUS: return <Unimplemented side={side} />;
        case Sider.FINN_ARBTAKERE_HOS_ORGNR: return <FinnArbtakereHosOrgnr tittel={Sider[side]} />;
        case Sider.FINN_SYKMELDING_FRA_MOTTAKID: return <Unimplemented side={side} />;
        case Sider.AKTIVITETSKRAV: return <Unimplemented side={side} />;
        case Sider.SLETT_DIALOGMOTER: return <Unimplemented side={side} />;
        case Sider.SLETT_MOTEBEHOV: return <Unimplemented side={side} />;
        case Sider.SLETT_VEILEDEROPPGAVER: return <Unimplemented side={side} />;
        case Sider.SLETT_OPPFOLGINGSDIALOG: return <Unimplemented side={side} />;
        case Sider.ENDRE_OPPFOLGINGSDIALOG: return <Unimplemented side={side} />;
        case Sider.PLANLAGT_VARSEL: return <Unimplemented side={side} />;
        case Sider.TESTBRUKERE_STATUS: return <Testbrukere tittel={Sider[side]} />;
        case Sider.SETT_LEGACY_I_TILTAK: return <Unimplemented side={side} />;
        case Sider.LEGG_JOURNALPOST_PA_KO: return <Unimplemented side={side} />;
        default: return <OpprettSykmelding tittel={Sider[Sider.OPPRETT_SYKMELDING]} />;
    }
}
