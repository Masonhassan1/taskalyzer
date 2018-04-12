# TaskBerry | A Productivity and Time Management Application

Full stack web application build with MERN stack<br/>

## Table of Contents

* [Technology stack](#technology-stack)
* [Quick Start](#quick-start)
* [Procution Build](#browser-support)

## Technology Stack

- React
- Redux
- Reactstrap
- Nodejs
- Express
- MongoDB
- JWT
- BCrypt

## Quick start

- Install dependencies

  `npm run install:client`<br/>
  `npm run install:server`<br/>

- Runnning the development server of the frontend

  `npm run start:client`<br/>

- Runnning the backend

  `npm run start:server`


## Production build

The project is configured to deploy the production version to heroku by running these commands in the terminal

- Building the frontend
  `npm run build`

- Configure environment variables `MONGODB_URI` and `JWT_KEY` in heroku 

- `heroku-postbuild` command will automatically run when deployed to heroku.
