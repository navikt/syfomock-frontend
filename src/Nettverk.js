import {API_URL} from "./App";

export const opprettSykmelding = (data) => {
    fetch(API_URL + "/nyttmottak/sykmelding/opprett/", {
        method: "POST",
        body: data
    })
        .then(res => res.text())
        .then((result) => {
            return {isLoaded: true, returverdi: result}
        });
};

export const getTekst = (target) => {
    fetch(API_URL + target)
        .then(res => res.text())
        .then((result) => {
            return {isLoaded: true, returverdi: result}
        });
};
