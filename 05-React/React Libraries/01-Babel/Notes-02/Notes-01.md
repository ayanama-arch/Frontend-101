# Babel

Babel is JS Compiler.
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

`Main features of Babel:`

- Transform syntax --> It transforms ecmascript version to older version so that older browser understands newer code.

```js
// Modern JavaScript (ES6+)
const greet = (name) => {
  console.log(`Hello, ${name}!`);
};

// Transformed using Babel for compatibility
("use strict");

var greet = function greet(name) {
  console.log("Hello, " + name + "!");
};
```

- Polyfill features --> Adds missing features in your target environment.

```js
// Using Array.from, which may not be supported in all environments
const array = Array.from("Babel");

// Transformed with Babel + Polyfill
("use strict");

var _Array$from = require("core-js-pure/stable/array/from");

var array = _Array$from("Babel");
```

- Source Code Transformation --> This involves making systematic changes across your codebase.

```js
// Using a custom utility function
const result = customUtility(42);

// Codemod to replace customUtility with newUtility
const result = newUtility(42);
```

## JSX and React

Babel can convert JSX syntax! by adding `@babel/preset-react` in babel configuration.

## Miscellaneous

`Debuggable:` Source Map support so you can debug your code.
`Compact:` It generates least amount of code.
