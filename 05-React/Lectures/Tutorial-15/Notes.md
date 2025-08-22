# Testing

## Enzyme

## Jest

## Why do we need a testcases

If we're adding new code it shouldn't break existing code.

## Test Driven Development

We write test case before writing code.

## Different Type of Testing

### Manual Testing

### Automation Testing

Code testing code

* Selenium Testing
* Regression Testing
* Smoke Testing
* Performance Testing
* Load Testing
* Black box Testing

### End to end testing

Covers entire user Journey

### Headless Browser

## Unit Testing

## Integration Testing

## React Testing Library

It uses JEST behind it which is used for testing javascript

### 1. Installing Testing library

* Install react-testing-library & JEST

    ```js
        npm install --save-dev @testing-library/react
        npm i -D jest
    ```

### 2. Configuring JEST

* It will create a config file

```js
    npx jest --init
    npm run test
```

### 3. Created First Test Case

* Inside __test__ folder we will create a file and write a test code for our component

```js
    // sum.test.js

    // It will throw an error cannot use import statement outside module so we need to configure it with jest
    import { sum } from "../sum";

    test("Check sum of 2 positive numbers ", () => {
    expect(sum(2, 5)).toBe(5);
    });

```

### 4. Configure Babel and jest

* Install babel with jest

```js
    // Installing babel with jest
    npm install --save-dev babel-jest @babel/core @babel/preset-env

    // Configuring babel-jest in our root folder
    // We can do it in two ways
    // 1. babel.config.js
    // 2. .babelrc

    // .babelrc
    {
    "presets": [["@babel/preset-env", {"targets": {"node": "current"}}]],
    }
```

* jsDOM environment is running the testcode, not browser.
