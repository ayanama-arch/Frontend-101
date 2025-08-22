# Using Babel

## Steps to Work with Babel

1. Installing Babel

   ```bash
   npm install --save-dev @babel/core @babel/cli @babel/preset-env
   ```

2. Setup babel.config.json file at root direcoty

   ```json
   "presets": [
          [
          "@babel/preset-env",
              {
              "targets": {
              "edge": "17",
              "firefox": "60",
              "chrome": "67",
              "safari": "11.1"
              },
              "useBuiltIns": "usage",
              "corejs": "3.6.5"
              }
          ]
      ]
   ```

3. Running below command compile code into lib folder

   ```bash
   ./node_modules/.bin/babel src --out-dir lib
   ```

## Basics usage with CLI

`@babel/core`: All the core functionality of babel resides inside this module.

`@babel/cli`: It allows to to use babel from terminal.

`plugins`: Plugins are library for doing particular tasks eg: **@babel/plugin-transform-arrow-function**
`presets`: Presets are set of plugins eg: **@babel/preset-env**, env preset will only load transformation needed in your target environment.

`NOTE:` By default preset will include all plugins to support modern javascript.

## Polyfill

In updated version it is already included in `core-js/stable`, polyfills are used to transform the modern ecmascript methods into regular code.
