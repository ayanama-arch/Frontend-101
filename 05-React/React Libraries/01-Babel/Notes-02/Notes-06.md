# @babel/cli

## Installation

It is recommended to install it locally inside your projects.
Create package.json before installing it for better npx interaction with cli.

```bash
    npm i --save-dev @babel/core @babel/cli
```

## Usage

Before running below command make sure to install both libraries otherwise it will install older versions.

- `Compile Files:`

```js
    // Compile index.js file into terminal
    npx babel index.js

    // Compile index.js file to index-compiled.js file (We can use -o instead of --out-file)
    npx babel index.js --out-file index-compiled.js

    // Compile file each time when something changes (we can use -w instead of --watch)
    npx babel index.js --watch --out-file index-compiled.js
```

`Note:` Don't forget to add .babelrc file and define the preset in it.

- `Compile Directory:`

```js
    // Compiles entire folder to prd folder (We can use -d instead of --out-dir)
    npx babel src --out-dir prd

    // Compiles entire directory and concate it into single file
    npx babel src --out-file index-compiled.js
```

## Compile with source maps

If you would then like to add a source map file you can use --source-maps or -s.

```Shell
npx babel script.js --out-file script-compiled.js --source-maps
```

Or, if you'd rather have inline source maps, use --source-maps inline instead.

```Shell
npx babel script.js --out-file script-compiled.js --source-maps inline
```

## Using Plugins

Use the --plugins option to specify plugins to use in compilation

```Shell
npx babel script.js --out-file script-compiled.js --plugins=@babel/transform-class-properties,@babel/transform-modules-amd
```

## Using Presets

Use the --presets option to specify presets to use in compilation

```Shell
npx babel script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/flow
```

## Using Config Files

Ignoring .babelrc.json or .babelrc
Ignore the configuration from the project's .babelrc or .babelrc.json file and use the cli options e.g. for a custom build

```Shell
npx babel --no-babelrc script.js --out-file script-compiled.js --presets=@babel/preset-env,@babel/preset-react
```

## Custom config path

```Shell
npx babel --config-file /path/to/my/babel.config.json --out-dir dist ./src
```
