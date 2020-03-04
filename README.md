# syfomock-frontend

Dette er frontenden for [syfomock-backend](https://github.com/navikt/syfomock-backend)! Den er skrevet i JavaScript med React og React Hooks. Denne skal ligge kun i dev-sbs, med [syfoproxy](https://github.com/navikt/syfoproxy/tree/master/syfomock) som mellomlag som fører trafikk gjennom til backenden.

## Kjøre lokalt

I skrivende stund er det mulig å kommunisere med syfoproxy fra lokalt oppsett. `yarn start` vil starte en utviklingsversjon av applikasjonen.

> Alle nettverkskall går gjennom til backenden, og påvirker testmiljøet!

## Bygge til dev-sbs

Commits til master-branchen fører til deployments til dev-sbs.
