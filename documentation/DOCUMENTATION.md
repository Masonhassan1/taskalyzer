# TaskBerry | A Productivity and Time Management Application

Full stack web application build with MERN stack<br/>

## Table of Contents

* [Technology stack](#technology-stack)
* [Project structure](#project-structure)
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

<hr />

## Project structure

- The front end of this project is on the `client` directory and it's created from the cra-template (Official create-react-app template)

    .
    ├── client                  # Front end root directory
    │   ├── public/             # Public files
    │   ├── src/                # Source files
    │   ├── .editorconfig
    │   ├── .eslintignore
    │   ├── .eslintrc
    │   ├── .gitignore
    │   ├── .prettierignore
    │   ├── .prettierrc
    │   ├── jsconfig.json
    │   ├── package-lock.json
    │   ├── package.json
    │   └── README.md
    └── ...

- The back end of the project is built with NodeJS, Express, MongoDB and it's files on the root directory.

    .
    ├── api                     # Back end root directory
    │   ├── controllers         # Roue controller configurations
    │   ├── middlewares         # Middlewares
    │   └── routes              # Route endpoints
    ├── models
    │   ├── Task.js             # Task Schema Model
    │   ├── Todo.js             # Todo Schema Model
    │   └── User.js             # User Schema Model
    ├── .env                    # Default environment variables for production backend server (Not tracked with git)
    ├── .eslintignore
    ├── .eslintrc
    ├── .gitignore
    ├── .prettierignore
    ├── .prettierrc
    ├── app.js
    ├── index.js
    ├── nodemon.json            # Default environment variables for development backend server
    ├── package-lock.json
    ├── package.json
    └── README.md

<hr />

## Quick start

- Install dependencies
`npm run install:client`<br/>
`npm run install:server`<br/>

> Note: You should run the front end server on one terminal and the back end server on a different terminal.

#### Development quick start

> These development servers will run in the watch mode and your code changes will reflect on the servers immediately and it will restart qutomatically after each changes.
> Note: The development backend server finds environment variables in `nodemon.json` file.

##### Runnning the development client server
- Open a terminal and go to `client` directory
`cd client`

- Run development server. (This is the default development react-script)
`npm run dev`

- This front end server is proxied through the address `http://localhost:5000` as described in the `client/package.json` file

##### Runnning the development backend server
- Open another terminal window and run the following command
`npm run dev`

========================================================

#### Production quick start (Optional)

> You should create an `.env` file and setup the following environment variables. You may change these values, but don't change the keys.

```bash
PORT=5000
MONGODB_URI=mongodb://localhost/taskberry
JWT_KEY=TASKBERRY_SECRET_KEY
```

> Note: The production backend server finds environment variables in `.env` file.
> Note: You only need one terminal window for the production servers.
> The production servers are handled with `concurrently`. It will run both appropriate servers as described in `package.json` file

- Runnning the production servers 
`npm run start`

<hr />

## Production build

The project is configured to deploy the production version to heroku by running these commands in the terminal

- Building the frontend
  `npm run build`

- Configure environment variables `MONGODB_URI` and `JWT_KEY` in heroku 

- `heroku-postbuild` command will automatically run when deployed to heroku.
