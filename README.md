![GoStack Bootcamp](https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png "GoStack Bootcamp")

# GoBarber
![GitHub](https://img.shields.io/github/license/cleiver/GoStack11---GoBarber-Backend?style=plastic)

GoBarber is the main project developed during the GoStack 11 Bootcamp.

## Features

In this application, clients can schedule a time with their favorite barber to have their hair cut.

- User registration and authentication
- Appointment schedules
- ... more to come!

## The future
For now the code is as I have learnt during the course. However, I'm planning in improve it further with some alterations and more functionalities. I also plan to make it available online for demonstration.

## Installing
This API just need NodeJs and a Postgres database to run.

```
git clone git@github.com:cleiver/GoStack11---GoBarber-Backend.git GoBarberAPI
```
```
cd GoBarberAPI
```
```
yarn
```
```
docker run --name postgres_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

### Initial Configuration
```
yarn typeorm migration:run
```

### Getting started
```
yarn dev:start
```

## Application interfaces
### [Web Application](https://github.com/cleiver/GoStack11---GoBarber-Web)

### Mobile Application

## licensing

I'm not the owner of this application, it was made available to me through the [bootcamp](https://rocketseat.com.br/gostack) held by [Rocketseat](https://rocketseat.com.br/).

I have thrown some comments along the code to remind me of what I learnt and thought was useful at the time.

Feel free to fork this repo and learn too.
