import React, {useEffect} from 'react';
import {Undertittel} from "nav-frontend-typografi";
import {Hovedknapp} from "nav-frontend-knapper";
import {AlertStripeFeil, AlertStripeSuksess} from "nav-frontend-alertstriper";
import {API_URL} from "../App";
import {useFormPost, useInput} from "../hooks";
import {Sider} from "../sider";
import Side from "../components/Side/Side";
import '../components/Pickr/flatpickr.less';


export default function OpprettPapirsykmelding() {
    const [ocr, ocrInput] = useInput({label: "OCR-fil", initialState: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<skanningmetadata xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:noNamespaceSchemaLocation=\"skanning_meta.xsd\">\n" +
            "    <sykemeldinger>\n" +
            "        <pasient>\n" +
            "            <fnr>testfnr</fnr>\n" +
            "        </pasient>\n" +
            "        <medisinskVurdering>\n" +
            "            <hovedDiagnose>\n" +
            "                <diagnosekode>S52.5</diagnosekode>\n" +
            "            </hovedDiagnose>\n" +
            "        </medisinskVurdering>\n" +
            "        <aktivitet>\n" +
            "            <aktivitetIkkeMulig>\n" +
            "                <periodeFOMDato>2020-05-03</periodeFOMDato>\n" +
            "                <periodeTOMDato>2020-05-04</periodeTOMDato>\n" +
            "            </aktivitetIkkeMulig>\n" +
            "        </aktivitet>\n" +
            "        <behandler>\n" +
            "            <HPR>7125186</HPR>\n" +
            "        </behandler>\n" +
            "    </sykemeldinger>\n" +
            "</skanningmetadata>"});


    const [post, isLoaded, returverdi, error, setIsLoaded] = useFormPost();

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams({
            ocr
        });

        post(API_URL + "/papirsykmelding/opprett/", data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(false), 3000);
    }, [isLoaded, setIsLoaded]);

    return <Side>
        <div className="flex-container">
            <Undertittel>{Sider.OPPRETT_PAPIRSYKMELDING.tittel}</Undertittel>
        </div>
        <form onSubmit={handleSubmit}>
            {ocrInput}
            <Hovedknapp htmlType="submit" className='blokk-xs'>Opprett papirsykmelding</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : null}
    </Side>;
}
