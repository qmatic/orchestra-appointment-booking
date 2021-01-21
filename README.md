# Appointment Booking

This is an Angular 10 application. Read more about Angular here: `https://angular.io/docs`

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


## Table of contents

- [Installation](#installation)
- [Development](#development) 
- [Production Build](#production-build) 
- [Info to customerSection](#info-to-customer-section) 
- [Print Email Templete](#print-email-templete) 
- [Further help](#further-help) 
  
## Installation
BEFORE YOU INSTALL: please read the [Prerequisites](#prerequisites)

Clone the Mobile Ticket Solution
```
git clone https://github.com/qmatic/orchestra-appointment-booking.git
```
When the cloning is complete, install the required node modules by running the following command from the project directory
```
npm install
```
We recommend Visual Studio Code (https://code.visualstudio.com/) as the IDE since it fits well with angular-cli tools. The original project is developed on visual code IDE.


## Development

If you have orchestra installed locally running on port 8080 run ```npm start``` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 
If you are working towards a remote orchestra you have to reconfigure the proxy config. You can use your own proxy.config.json like in the case of the script "startlocal" (package.json -> scripts). Create your own proxy.config.json using the proxy.config.json as a template and replace the targets.
You can find available npm commands in package.json under "scripts".
Use them by running ```npm run <your-command>```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Appointment Booking
Components are located in **src/app/components**
The store is located in **src/store**

The application routes can be found in: **src/routes/app-routes.ts**

Release notes are located in **/release-notes**

## Production Build
 ### Create war file

Run `npm run build-artifactory` to build the project. The build artifacts will be stored in the `dist/` directory.

The build number is taken from `src/app.json`


## Info to customer Section

Info to customer section can be used to add personal notes to a specific visit. That feature should be enabled in the configuration by checking "Includes Info to customer field" in the Titles and notes section. Info to customer could be sent to the customers via email or SMS if the template in the notification module is configured to send them by using ```{{custom.infoToCustomer}}```

## Print Email Templete
Appointment booking can be configured to show email template in the print section from the configuration by enabling "Show email template for printing". To use this feature GL_Notification_1.8 or higer should be used. After enabling this feature, the print page will show the email message that is generated using the email template in the notification module.
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
