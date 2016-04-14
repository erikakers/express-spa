# Express Spa

Express Spa doesn't care what you're framework or library of choice is, Angular,
React, or something else it just provides a simple Express server that can be used
in both development and production for any Single Page Apps.

The Read Me provides a high level of how to use the Express Spa, for more detailed 
information please refer to the [Wiki](https://github.com/erikakers/express-spa/wiki). 

## [Routing](https://github.com/erikakers/express-spa/wiki/Routing)
Express Spa sends all traffic `public/index.html` with the assumption that that
the SPA will handle all routing for the app. This also allows use of pretty,
non-hashed, URLs by default. *(However, a history plugin may be required based on
your framework of choice.)*

## [Typescript](https://github.com/erikakers/express-spa/wiki/Type-Checking)
Express Spa uses Typescript by default, however based on the library or framework
of choice the `.d.ts` files need to be installed. For `.d.ts` installs you will
need [Typings](https://github.com/typings/typings) installed globally on your development
machine.

Any project specific definitions can be add to the `project.d.ts` file. Do not
remove the definitions that are already included, they are need to make HMR and
Webpack DefinePlugin work without errors.

## .ENV File
Express Spa uses a `.env` file to handle all environment variables. `.env` file
are ignored from getting committed into any repo. During the setup command the
sample `.env.example` file will be copy and renamed to `.env`.

Add environment specific variables as need. Examples being: database connections, API
credentials or anything else you need to reference through out the application.

### Default Variables
- `NODE_ENV=development`
- `MORGAN=combined`
- `TYPESCRIPT=true`

## [Setup & Usage](https://github.com/erikakers/express-spa/wiki/Configuration)

### NVM
Express Spa uses [NVM](https://github.com/creationix/nvm) to control specific Node version via the `.nvmrc` file. Whenever a project is started define the Node version that you are planning to use in the `.nvmrc` file. Then upgrade as you needed when your project grows.

### NPM
By default in Express Spa when an NPM package is installed the exact version will be saved into the `package.json` file. This helps prevent package updates from introducing breaking changes into the build. This behavior is controlled by the `.npmrc` file, changing the `save-exact` flag to false will disable exact verison saving.

### Setup
- Node.js installed via [NVM](https://github.com/creationix/nvm)
- Clone this repo `https://github.com/erikakers/express-spa.git`
- Run `npm run setup` - This setup up the project and only need one time.
- Run `npm start` will configure the server based on the variables that are set in the `.env` file.

### [Styling](https://github.com/erikakers/express-spa/wiki/Styling)
SASS(`.SCSS`) and `.CSS` compiling and importing is included by default. Either SCSS or CSS files can be used and import into component files. Webpack will combine and export any styling file to `styles.css`.  
