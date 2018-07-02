# Appointment Booking

This is an Angular 5 application. Read more about Angular here: `https://angular.io/docs`

This project uses ngrx/store to keep the application state. Read more here:
`https://github.com/ngrx/platform`

Or view this helpful tutorial to get some insight to working with ngrx and also understanding this application:
`https://www.youtube.com/watch?v=N_UQx8dPPkc&list=PLW2eQOsUPlWJRfWGOi9gZdc3rE4Fke0Wv&index=1`

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.


## Getting Started

These instructions will help you get started running this project on your local machine for,
1. Development
    1. Orchestra Installed on your local machine
    2. Orchestra Installed on a remote machine
2. Creating the Production Build

## Prerequisites

Make sure you have installed 
1. Node 8 or above. `https://nodejs.org/`
2. gulp (after installing node `npm install gulp-cli`)

## Development

1. Clone the project
2. Run the following command to install all dependencies

```
npm install
```

## Development server

If you have orchestra installed locally running on port 8080 run ```npm start``` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
If you are working towards a remote orchestra you have to reconfigure the proxy config. You can use your own proxy.config.json like in the case of the script "startlocal" (package.json -> scripts). Create your own proxy.config.json using the proxy.config.json as a template and replace the targets.
You can find available npm commands in package.json under "scripts".
Use them by running ```npm run <your-command>```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Production Build (Create war file)

Run `npm run build-artifactory` to build the project. The build artifacts will be stored in the `dist/` directory.

The build number is taken from `src/app.json`

## Appointment Booking
Components are located in **src/app/components**
The store is located in **src/store**

The application routes can be found in: **src/routes/app-routes.ts**

Release notes are located in **/release-notes**
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## License

### Apache Font License
Copyright 2018 Qmatic

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
