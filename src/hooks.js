import React, {useState} from "react";
import {Input} from "nav-frontend-skjema";
import {guid} from 'nav-frontend-js-utils';
import {Undertekst} from "nav-frontend-typografi";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js'
import './components/Pickr/flatpickr.less';
import moment from "moment";
import {Lukknapp} from 'nav-frontend-ikonknapper';


export function useInput({label, initialState = "", tips = ""}) {
    const [value, setValue] = useState(initialState);

    const inputId = guid();
    const input = (<div className="skjemaelement">
        <div className="flex-container">
            <label className="skjemaelement__label" htmlFor={inputId}>{label}</label>
            {tips !== "" && <Undertekst className="flex--end">{tips}</Undertekst>}
        </div>
        <input
            type="text"
            className="skjemaelement__input input--fullbredde"
            id={inputId}
            defaultValue={value}
            onChange={e => setValue(e.target.value)}
        />
    </div>);
    return [value, input, setValue];
}

export function useFlatpicker({label, initialState = new Date(), tips = "", optional = false, momentFormat = "YYYY-MM-DD", pickrFormat = "Y-m-d"}) {
    const state = initialState === "" ? "" : moment(initialState).format(momentFormat);
    const [value, setValue] = useState(state);

    const fjernDato = (event) => {
        event.preventDefault();
        setValue("");
    };

    const inputId = guid();
    const input = (<div className="skjemaelement">
            <div className="flex-container">
                <label className="skjemaelement__label" htmlFor={inputId}>{label}</label>
                {tips !== "" && <Undertekst className="flex--end">{tips}</Undertekst>}
            </div>
            <div className="flex-container">
                <Flatpickr
                    name={inputId}
                    onChange={o => setValue(moment(o[0]).format(momentFormat))}
                    value={value}
                    className="skjemaelement__input input--fullbredde"
                    placeholder="dd.mm.yyyy"
                    options={{
                        mode: 'single',
                        enableTime: false,
                        dateFormat: pickrFormat,
                        altInput: true,
                        altFormat: 'd.m.Y',
                        locale: Norwegian,
                        allowInput: true
                    }}
                />
                {optional && value !== ""
                    ? <Lukknapp onClick={fjernDato} bla={true} />
                    : null
                }

            </div>
        </div>
    );

    return [value, input, setValue];
}

export const parseFetchResponse = (response, parser) => {
    return response[parser]().then(obj => ({
        body: obj,
        meta: response
    }));
};

export function useGet() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const get = (url) => {
        fetch(url)
            .then(res => parseFetchResponse(res, "text"))
            .then(res => {
                console.log(res);
                if (res.meta.status === 200) {
                    setReturverdi(res.body);
                    setError("");
                    setIsLoaded(true)
                } else {
                    res.body === "" ? setError(res.meta.statusText) : setError(res.body)
                    setReturverdi("");
                    setIsLoaded(true)
                }
            });
    };

    return [get, isLoaded, returverdi, error];
}

export function useJsonGet() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState([]);
    const [error, setError] = useState('');

    const get = (url) => {
        fetch(url)
            .then(res => parseFetchResponse(res, "json"))
            .then(res => {
                if (res.meta.status === 200) {
                    setReturverdi(res.body);
                    setError("");
                    setIsLoaded(true);
                } else {
                    setReturverdi("");
                    setError(res.body.message);
                    setIsLoaded(true);
                }
            });
    };

    return [get, isLoaded, returverdi, error, setReturverdi];
}

export function useFormPost() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const post = (url, formdata) => {
        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(res => parseFetchResponse(res, "text"))
            .then(res => {
                if (res.meta.status === 200) {
                    setReturverdi(res.body);
                    setError("");
                    setIsLoaded(true);
                } else {
                    setReturverdi("");
                    setError(res.body);
                    setIsLoaded(true);
                }
            });
    };

    return [post, isLoaded, returverdi, error, setIsLoaded, setError];
}

export function useLocalStorageInput({label, key, initialState = ""}) {
    const [value, setValue] = useLocalStorage(key, initialState);
    const input = <Input label={label} defaultValue={value} onChange={e => setValue(e.target.value)}/>;
    return [value, input, setValue];
}

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}
