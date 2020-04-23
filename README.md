![GoStack Bootcamp](https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png "GoStack Bootcamp")

# GoBarber

GoBarber is the main project developed during the GoStack 11 Bootcamp.

This is the backend API of the application. It was developed using NodeJS and needs a docker image of Postgres as database.

## Instalation

```
$ git clone git@github.com:cleiver/GoStack11---GoBarber-Backend.git GoBarberAPI

$ cd GoBarberAPI

$ yarn

$ docker run --name postgres_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

$ yarn dev:server
```

## Frontends
- [Web Application](https://github.com/cleiver/GoStack11---GoBarber-Web)
- Mobile Application
