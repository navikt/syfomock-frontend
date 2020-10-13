import React, { useEffect, useState } from 'react';
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
import { Select } from 'nav-frontend-skjema';

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const types = {
    VANLIG: 'VANLIG',
    VEDLEGG: 'VEDLEGG',
    SVAR_MOTEINNKALLING: 'SVAR_MOTEINNKALLING',
    SVAR_FORESPORSEL: 'SVAR_FORESPORSEL',
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
    const [type, setType] = useState(types.VANLIG);

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = new URLSearchParams({
            fnr,
            eid,
            msgid,
            legefnr,
            notat,
            type
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

                    <Select label="Sykmeldingstype"
                            value={type}
                            name="type"
                            key="type"
                            onChange={e => setType(e.target.value)}
                    >
                        <option key="Vanlig" value="VANLIG">{'Vanlig'}</option>
                        <option key="Vedlegg" value="VEDLEGG">{'Vedlegg'}</option>
                        <option key="Svar møteinnkalling" value="SVAR_MOTEINNKALLING">{'Svar Møteinnkalling'}</option>
                        <option key="Save forespørsel" value="SVAR_FORESPORSEL">{'Svar forespørsel'}</option>
                    </Select>
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
