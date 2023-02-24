# Hip-Hop Battlebots

Hip-Hop Battlebots lets you emcee a rap battle between two robots. Step up to the mic now and play some Hip-Hop Battlebots: [Hip-Hop Battlebots on Heroku](https://battlebot.herokuapp.com/)

## Dev Stack

### Frontend

- React
- TailwindCSS
- JavaScript

### Backend

- Express
- Node.js
- Datamuse API

## Features

- A user can play a Mad Libs-style game
- A user fills in the blank of a random line
- A new line is generated with a rhyming word based on the user's input
- Play continues until the user decides that the battle is over by choosing "Mic Drop"
- Battles are saved for future viewing in the main Battle List, as well as a user's profile

## Local Setup

- Clone the repo
- Configure your .env file based on the .env.example file
- Run `yarn install`
- Run `createdb battlebot_development`
- Run `cd server`
- Run `yarn migrate:latest`
- Run `yarn db:seed`
- Run `cd ..`
- Run `yarn run dev`
- Visit `localhost:3000` in your browser
