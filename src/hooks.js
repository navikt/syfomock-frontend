import React, {useState} from "react";
import {Input} from "nav-frontend-skjema";


export function useInput({ label, initialState="" }) {
    const [value, setValue] = useState(initialState);
    const input = <Input label={label} value={value} onChange={e => setValue(e.target.value)} />;
    return [value, input, setValue];
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
