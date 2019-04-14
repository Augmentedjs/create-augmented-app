#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const https = require("https");
const { exec } = require("child_process");

const packageJson = require("../package.json");

const scripts = `"start": "cross-env NODE_ENV=development webpack-dev-server -d",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "test": "mocha --require @babel/register --require test/helper.js -c test/*Spec.js",
    "clean": "rm -rf node_modules",
    "reinstall": "npm run clean && npm install",
    "rebuild": "npm run clean && npm install && npm run build"`;

const jestConfig = `"license": "Apache-2.0"`;

/**
 * we pass the object key dependency || devdependency to this function
 * @param {object} deps object key that we want to extract
 * @returns {string} a string of "dependencies@version"
 * that we can attach to an `npm i {value}` to install
 * every dep the exact version speficied in package.json
 */
const getDeps = deps =>
  Object.entries(deps)
    .map(dep => `${dep[0]}@${dep[1]}`)
    .toString()
    .replace(/,/g, " ")
    .replace(/^/g, "")
    // exclude the plugin only used in this file, nor relevant to the boilerplate
    .replace(/fs-extra[^\s]+/g, "");

console.info("Initializing project..");

// create folder and initialize npm
exec(
  `mkdir ${process.argv[2]} && cd ${process.argv[2]} && npm init -f`,
  (initErr, initStdout, initStderr) => {
    if (initErr) {
      console.error(`Error: ${initErr}`);
      return;
    }
    const packageJSON = `${process.argv[2]}/package.json`;
    // replace the default scripts, with the webpack scripts in package.json
    fs.readFile(packageJSON, (err, file) => {
      if (err) throw err;
      const data = file
        .toString()
        .replace(`"test": "echo \\"Error: no test specified\\" && exit 1"`, scripts)
        .replace(`"license": "Apache-2.0"`, jestConfig);
      fs.writeFile(packageJSON, data, err2 => err2 || true);
    });

    const filesToCopy = ["README.md", "webpack.config.js", ".eslintrc", ".babelrc"];

    for (let i = 0; i < filesToCopy.length; i += 1) {
      fs.createReadStream(path.join(__dirname, `../${filesToCopy[i]}`))
        .pipe(fs.createWriteStream(`${process.argv[2]}/${filesToCopy[i]}`));
    }

    // npm will remove the .gitignore file when the package is installed, therefore it cannot be copied
    // locally and needs to be downloaded. See https://github.com/Kornil/simple-react-app/issues/12
    https.get(
      "https://raw.githubusercontent.com/Augmentedjs/create-augmented-app/master/.gitignore",
      (res) => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", (data) => {
          body += data;
        });
        res.on("end", () => {
          fs.writeFile(`${process.argv[2]}/.gitignore`, body, { encoding: "utf-8" }, (err) => {
            if (err) throw err;
          });
        });
      },
    );

    console.info("npm init -- done\n");

    // installing dependencies
    console.info("Installing deps -- it might take a few minutes..");
    const devDeps = getDeps(packageJson.devDependencies);
    const deps = getDeps(packageJson.dependencies);
    exec(
      `cd ${process.argv[2]} && npm i -D ${devDeps} && npm i -S ${deps}`,
      (npmErr, npmStdout, npmStderr) => {
        if (npmErr) {
          console.error(`Error ${npmErr}`);
          return;
        }
        console.info(npmStdout);
        console.info("Dependencies installed");

        console.info("Copying additional files..");
        // copy additional source files
        fs.copy(path.join(__dirname, "../src"), `${process.argv[2]}/src`)
          .then(() =>
            console.info(`copying source`))
          .catch(err => console.error(err));

        fs.copy(path.join(__dirname, "../test"), `${process.argv[2]}/test`)
          .then(() =>
            console.info(`copying tests`))
          .catch(err => console.error(err));

        fs.copy(path.join(__dirname, "../service"), `${process.argv[2]}/service`)
          .then(() =>
            console.info(`All done!\nYour project is now started into ${process.argv[2]} folder,
              refer to the README for the project structure.\nHappy Coding!`))
          .catch(err => console.error(err));
      }
    );
  },
);
