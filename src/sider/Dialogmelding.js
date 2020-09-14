import React, {useCallback, useEffect, useState} from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import {
    AlertStripeFeil,
    AlertStripeSuksess,
} from 'nav-frontend-alertstriper';
import { API_URL } from '../App';
import {
    useFormPost,
    useInput,
    useLocalStorageInput,
} from '../hooks';
import { Sider } from '../sider';
import Side from '../components/Side/Side';
import '../components/Pickr/flatpickr.less';
import {Checkbox} from "nav-frontend-skjema";

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Dialogmelding() {
    const [fnr, fnrInput] = useLocalStorageInput({label: "Fødselsnummer til pasient", key: "fnr"});
    const eid = randomInteger(1000000000, 99999999999);
    const [msgid, msgidInput] = useInput({
        label: "msgId",
        initialState: randomInteger(1000000000, 99999999999),
        tips: "For sporing i loggene!"
    });
    const [legefnr, legefnrInput] = useInput({label: "Fødselsnummer til lege", initialState: "01117302624"});
    const [post, isLoaded, returverdi, error, setIsLoaded] = useFormPost();
    const [notat, notatInput] = useInput({label: "Notat"});
    const [inklVedlegg, setInklVedlegg] = useState(false);

    const handleCheck = useCallback(() => {
        setInklVedlegg(!inklVedlegg);
    }, [inklVedlegg]);


    const handleSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams({
            fnr,
            eid,
            msgid,
            legefnr,
            notat,
            inklVedlegg
        });

        post(API_URL + "/dialogmelding/opprett/", data);
    };

    useEffect(() => {
        setTimeout(() => setIsLoaded(false), 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    return <Side>
        <div className="flex-container">
            <Undertittel>{Sider.DIALOGMELDING.tittel}</Undertittel>
        </div>
        <form onSubmit={handleSubmit}>
            {fnrInput}
            {
                <>
                    {legefnrInput}
                    {msgidInput}
                    {notatInput}
                    <Checkbox
                        label="Inkludér vedlegg"
                        name="inklVedlegg"
                        key="inklVedlegg"
                        onClick={handleCheck}
                        defaultChecked={inklVedlegg}
                    />
                </>
            }
            <Hovedknapp htmlType="button" onClick={handleSubmit} className='blokk-xs'>Opprett Dialogmelding</Hovedknapp>
        </form>
        {isLoaded ?
            error === '' ?
                <AlertStripeSuksess>{returverdi.replace(/<\/?[^>]+(>|$)/g, "")}</AlertStripeSuksess>
                : <AlertStripeFeil>{error}</AlertStripeFeil>
            : null}
    </Side>;
}
