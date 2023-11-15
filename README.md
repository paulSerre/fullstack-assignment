<img src="https://user-images.githubusercontent.com/28607713/212879228-3ca54e74-ee8f-485c-a5d2-e54758b471dc.png"
     alt="planet-logo-white-no-bg"
     width="240">


# Planet fullstack-assignment
Full-Stack position skill assessment home assignment.

## Overview
We provide you with a project that has a database, an API, a service that executes periodically
and a web app.

This project has part of the functionality of fictitious software solution that provides stock exchange data services:
it allows the user of the web app to subscribe to currencies, and see the current exchange prices of those he/she
whishes to follow.

You are responsible of finishing the app by implementing:
- The code that executes periodically and fetches the forex data.
- The code for the API endpoint that sends that data to the front-end.
- The front-end code to see and edit the list of currencies currently followed, along with their stock prices.

## About this repository
This repository holds the basic project structure for implementing a NodeJS based API and service,
and an Angular web app.

The code is organized as follows:

- `services`
     - \ `api` - A NodeJS project with ExpressJS, TypeScript and Mongoose to implement the API.
     - \ `front-end` - An Angular project with TypeScript, SCSS, Material and NgRX to implement the web app. Implementation details can be found in `services/front-end/README.md`.
     - \ `service` - A NodeJS-based service with TypeScript and Mongoose that is setup to run periodically in order to implement asynchronous tasks.
- `docker-compose.slim.yml` - 
- `docker-compose.yml` - 
- `dump` - 
- `Makefile` - Makefile for your ease of development, see below
- `frontend.mk` - Makefile rules for the web app.
- `backend.mk` - Makefile rules for the API.
- `service.mk` - Makefile rules for the asynchronous task.
- `db.mk` - Makefile rules for the database.
- `dev.mk` - Makefile rules with PHONY targets for easier development.
- `README.md` - This file.
- `LICENSE`


Disclaimer: The purpose and usage of this repo is solely for insight acquisition regarding problem-solving,
and does not represent an existing and ongoing implementation task.

PS: We provide this structure as a starting point but you may discard it and approach the task in
any other way.

## Tasks
### 1. Forex data retrieval
#### Considerations
- An API key should be provided in the Dockerfile to enable API calls. Although I have provided mine, I cannot guarantee its functionality as I could have reach usage limit (Alphavantage).

#### Implementation choices
Nestpaths are not considered due to the potential for excessive data in documents, depending on timeserie granularity and the application's age. Once a significant number of time series points are reached, considering pagination for historical points will be necessary. Modeling time series points as a relation to currencies simplifies this process.

#### Caveats
Deleting a time series point will not remove the relation from a currency because it is expected that they will be updated rather than removed.

### 2. API endpoint for retrieving the fetched forex data
#### Implementation choices
Time series points are modeled as a relation of currencies. Given the requirement to return only subscribed currencies, I chose to use the existing endpoint `[GET] /api/currencies` with an additional `history`` query parameter to include or exclude historical points of subscribed currencies.


### 3. Interface to list followed currencies
#### Implementation choices
Even though currency data is only relevant to a single component and does not need to be persisted after the component is destroyed, I chose to centralize all data in a service. This data could have easily been kept in the currency-list component.

### 4. Caveats and possible improvements
#### Caveats
- If a currency has never been subscribed to before a user subscribes to it, the user will have to wait for a cron job to run before seeing currency values.
- The FOREX API has a call rate limit, so a lower frequency for the cron job should be considered.
- The FOREX API does not have an endpoint to return supported currencies, which means you might subscribe to a currency that will never have data.
