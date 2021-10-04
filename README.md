# Company-UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

## Generate API Client

Before starting the application, you need to have the `api-client` folder in your project under `company-ui/src`. The `api-client` folder holds information about `company-controller`, namely specifications for endpoints and data transfer objects (DTOs). To generate this, you need to have `company-controller` running first (refer to related `README.MD` file). 

After you successfully start `company-controller`, execute the command `npm run generateApiClient`.

***Note:*** Backend has to be up and running, in order to generate `api-client`, or regenerate it if something has changed in the backend endpoint or DTOs.

## Starting up the application

To build and start up `company-ui` in local (live rebuild) mode, open the terminal, if you are not already there, navigate to the directory named `company-ui` and run the following command:

 ```./startUp.sh```

Your application will be running on `localhost:4200`, and will rebuild after making any changes to the code.

To build and start up `company-ui` using same configuration as deployed application in the cloud (no live rebuild), run:

 ```./startUp.sh dev```

Your application will be running on `localhost:3000`

***Note:*** If you are starting the `company-ui` for the first time, it can take some minutes until the dependencies get installed and the application is available on the respective localhost. Check the logs of the `company-ui` container and wait for the success log. After this, you can browse the application.

If you get an error 'Permission denied error' run `chmod +x startUp.sh`.
In case of other errors, please refer to the ***Troubleshoot*** section at the end of this README.

## Running unit tests
To execute the unit tests via [Karma](https://karma-runner.github.io), run:

 ```npm run test```

## Linting:

 ```npm run lint```

Lint is being used to enforce project's coding standards. All pull/merge requests have to pass the lint check. If they don't, the application will fail to build.

## Credentials
A sample user credential has been seeded while starting the application:

- username: {your_configured_username}
- password: {your_configured_password}

## Troubleshoot:
If you get the following error: 'Object is possibly undefined' when generating the `api-client`, or when starting the application with ```./startUp.sh``` or ```./startUp.sh dev```, try the steps below:

- comment out the code in the `company-controller` (OpenAPIConfiguration.java)  
```@SecurityScheme(name = "X-API-Key", type = SecuritySchemeType.APIKEY, in = SecuritySchemeIn.HEADER)```
- restart backend
- regenerate `api-client`
