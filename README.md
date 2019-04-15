# create-augmented-app
A simple create script to bootstrap a new app for Augmented.js Next

Simple base app with Augmented.js Next.  Contains Router, Mediator, webpack, babel, application, and sass.  Also includes hosting express service.

`npx create-augmented-app app-name` to create a starter app into `app-name` folder.

## What is this
This is a base project that you can use to start your Augmented.js Next apps, it works similarly to create-react-app.
It includes my latest versions and full setup to wire up the basics of an app, including mediation and routing.
Style is handled by sass/scss, Bundle is generated with webpack 4.  Babel is also included.

## What next
You can use both npm or yarn.  

`yarn start`/`npm start` to start express cluster server, it's live on `localhost:8080`.

`yarn run dev`/`npm run dev` to build dev bundle, fast, includes source-map and no uglify.

`yarn run build`/`npm run build` to build prod bundle, it includes both treeshaking and uglify to optimize the code as much as possible.  Also breaks up into vendor bundle js files.

`yarn test`/`npm test` run the tests with Jest and Enzyme, by default the test included only check for the correct render of base components & routes, all are passing.

## Project structure

The boilerplate structure and files are the same as this repo minus the *bin* folder, everything else is exactly the same.

```
*root*
|
├── */service/* The express hosting service
├── */src/*
│   ├── */application/* Application class, used for the core of the app
│   ├── */components/* small components, such as header and base dialogs
│   ├── */images/* images used in the app, including favicon
│   ├── */images/* Simple color console logger
│   ├── */router/* The router class and any routing subclasses
│   ├── */setup/* The 'main' class for starting the app
│   ├── */styles/* styling
│   ├── */views/* The base view components (including mediator)
│   ├── *constants.js* App constants
│   ├── *index.html* html entry point
│   ├── *index.js* javascript entry point
│   └── *messages.js* App messages for mediation
├── */test/* The mocha test files
├── *package.json* the whole package.json with every dependency and script, nothing is kept hidden
├── *.eslintrc* eslint config
├── *.babelrc* babel config (polyfills)
├── *webpack.config.js* webpack config, it has a dev and prod environment
└── *README.md* this file
```


## Tests

The testing environment is written in mocha + chai.  It's a simple base test file that give the simple start and runner.  It's intended to start hitting the app apis and and business logic.


## Eslint

This project has eslint installed for checking the code for quality. Run via npm run eslint
