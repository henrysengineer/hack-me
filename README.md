# Desk booking app

This is a proof of concept for a desk booking app.

## Stack

This project using NodeJS and NestJS in the backend portion and ReactJS in the client portion.
The language used is Typescript.

## Requirements

For this project you need `node` in version 14.
Make sure `nvm` is available on your PATH.
This project is optimized for a linux based runtime.

## Installation

Go to /backend, do `npm install`.
Then, go to /client and do `yarn`.

## Launch the project

Go to /backend, do `npm start`
Then, go to /client and do `yarn start`

**Do not forget to seed the database using `npm seed` from /backend to have test data**

## Testing

Currently only the backend has unit testing for controllers and services.
Go to /backend and do `npm test`.

## TODO

- Add makefile
- Add CRUD to client
- Add Calendar + booking to client
