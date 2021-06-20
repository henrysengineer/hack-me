# Hack Me

## Delivery

Let's create your branch on top of the main one.

At the end, push all changes and create a pull request.

## How to run and test

This app has been initiated with create-react-app with typescript.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## Exercise

Let's develop an application (local only) that allow the user to manage desks, employees and assignation day by day.

The app will contain a main menu with 3 items:

- Desks
- Employees
- Calendar

The app will be developed in TypeScript and will contain relevant unit test. Other libs may be added.

The delivery is not supposed to be all functional, let's focus on architecture, wording, ...

You'll have to present and justify your decisions during the debrief.

### Desks

The desk page will allow the user to create, view and modify the desk (unique number) list.


### Employees

The employee page will allow the user to create, view and modify the employee (name, etc...) list.

An employee may have a preferred ordered desk list.


### Calendar

The calendar page will display employee desk assignation for the next following days.

An action will allow the user to assign a specific free desk to an employee for a specific day.

An action will allow the user to remove an assignation.

An action will allow the user to trigger an algorithm that assign automatically desk to employee according to the preferred desk list.


### Extension : Zoning

Add zone concept. A zone is a group of desk. Desk could be part of 0 or 1 zone.

The app will allow the user to set zone to desk.

The app will allow the user to set a list of zone and/or desk to his preferred list.




