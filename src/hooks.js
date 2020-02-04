import React, {useState} from "react";
import {Input} from "nav-frontend-skjema";


export function useInput({ label, initialState="" }) {
    const [value, setValue] = useState(initialState);
    const input = <Input label={label} value={value} onChange={e => setValue(e.target.value)} />;
    return [value, input, setValue];
}

function fetchStatusHandler(response) {
    if (response.status === 200) {
        return response;
    } else {
        throw new Error(response.statusText);
    }
}

export function useGet() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const get = (url) => {
        fetch(url)
            .then(fetchStatusHandler)
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
                setError("");
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
                setReturverdi("");
            });
    };

    return [get, isLoaded, returverdi, error];
}

export function useJSONGet() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState([]);
    const [error, setError] = useState('');

    const get = (url) => {
        fetch(url)
            .then(fetchStatusHandler)
            .then(res => res.json())
            .then((data) => {
                setIsLoaded(true);
                setReturverdi(data.map(o => o.fnr));
                setError("");
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
                setReturverdi("");
            });
    };

    return [get, isLoaded, returverdi, error];
}

export function useFormPost() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [returverdi, setReturverdi] = useState('');
    const [error, setError] = useState('');

    const post = (url, formdata) =>  {
        fetch(url, {
            method: "POST",
            body: formdata
        })
            .then(fetchStatusHandler)
            .then(res => res.text())
            .then(res => {
                setIsLoaded(true);
                setReturverdi(res);
                setError("");
            })
            .catch(error => {
                setIsLoaded(true);
                setError(error.toString());
                setReturverdi("");
            });
    };

    return [post, isLoaded, returverdi, error, setIsLoaded, setError];
}

export function useLocalStorageInput({label, key, initialState=""}) {
    const [value, setValue] = useLocalStorage(key, initialState);
    const input = <Input label={label} value={value} onChange={e => setValue(e.target.value)} />;
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
