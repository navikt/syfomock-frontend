import React, { useState } from 'react'
import { Undertittel } from "nav-frontend-typografi"
import { Hovedknapp } from "nav-frontend-knapper"
import { AlertStripeFeil, AlertStripeSuksess } from "nav-frontend-alertstriper"
import { API_URL } from "../App"
import { useFormPost, useLocalStorageInput } from "../hooks"
import { Sider } from "../sider"
import Side from "../components/Side/Side"
import '../components/Pickr/flatpickr.less'
import { Select } from 'nav-frontend-skjema'
import { TemaSkjema } from '../TemaSkjema'

export default function OpprettPapirDokument() {
    const [ fnr, fnrInput ] = useLocalStorageInput({ label: "Fødselsnummer", key: "fnr" })
    const [ tema, setTema ] = useState("SYK")
    const [ brevkode, setBrevkode ] = useState("NAV 08-07.04D")

    const [ post, isLoaded, returverdi, error ] = useFormPost()

    const handleSubmit = (event) => {
        event.preventDefault()

        const tittel = TemaSkjema
            .find((t) => t.value === tema)
            .skjema
            .find((s) => s.brevkode === brevkode)
            .tittel

        let data = new URLSearchParams({
            fnr: fnr,
            tema: tema,
            tittel: tittel,
            brevkode: brevkode,
        })

        post(API_URL + "/papirdokument/opprett", data)
    }

    return (
        <Side>
            <div className="flex-container">
                <Undertittel>{Sider.OPPRETT_PAPIR_DOKUMENT.tittel}</Undertittel>
            </div>

            <form onSubmit={handleSubmit}>

                {fnrInput}

                <Select label="Tema" value={tema} name="tema" key="tema" onChange={e => setTema(e.target.value)}>
                    {TemaSkjema.map((tema) =>
                        <option value={tema.value} key={tema.value}>{`${tema.value} - ${tema.label}`}</option>
                    )}
                </Select>

                <Select label="Skjema" value={brevkode} name="skjema" key="skjema"
                        onChange={e => setBrevkode(e.target.value)}
                >
                    {TemaSkjema
                        .find((t) => t.value === tema)
                        .skjema
                        .map((s) =>
                            <option value={s.brevkode} key={s.brevkode}>{`${s.brevkode} - ${s.tittel}`}</option>
                        )}
                </Select>

                <Hovedknapp htmlType="submit" className="blokk-xs">Opprett papir dokument</Hovedknapp>
            </form>

            {isLoaded ?
                error === '' ?
                    <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                    : <AlertStripeFeil>{error}</AlertStripeFeil>
                : null}
        </Side>
    )

}
