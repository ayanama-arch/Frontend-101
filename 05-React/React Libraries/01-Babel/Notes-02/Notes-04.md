# @babel/preset-env

It is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms.

## Installation

```bash
    npm i --save-dev @babel/preset-env
```

## How does it work

It works with the help of some open-source libraries like `browswerlist`, `compat-table`, `electron-to-chromium`

`@babel/preset-env` takes any target environments you've specified and checks them against its mappings to compile a list of plugins and passes it to Babel.

## Browserlist Integration

Browserslist will use browsers and Node.js versions query from one of these sources:

- `.browserslistrc` config file in current or parent directories.
- browserslist key in package.json file in current or parent directories.
- browserslist config file in current or parent directories.
- BROWSERSLIST environment variable.
- If the above methods did not produce a valid result Browserslist will use defaults: > 0.5%, last 2 versions, Firefox ESR, not dead.

```json
// package.json
{ "browserslist": "> 0.25%, not dead" }
```
