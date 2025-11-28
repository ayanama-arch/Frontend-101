# ⚡ TypeScript Basics — Concise Notes

### 1. JavaScript Values & Behaviors

- Every value in JS has “behaviors.” Example:

  ```js
  const message = "Hello";
  message.toLowerCase(); // ✅ works
  message(); // ❌ TypeError: not a function
  ```

- JS only tells you about these mistakes **at runtime** (when you run the code).

---

### 2. What is a Type?

- A **type** = description of what operations a value supports.
- Example:

  - `"Hello"` has `.toLowerCase()` but is not callable.
  - A function can be called, but might not have `.toLowerCase()`.

- JS = **dynamic typing** → find mistakes when code runs.
- TS = **static typing** → catches mistakes **before** running code.

---

### 3. Static Type-Checking

- TypeScript checks code _before_ running it.

  ```ts
  const msg = "hello!";
  msg(); // ❌ Error: Type 'string' has no call signatures
  ```

- Prevents runtime bugs by warning you early.

---

### 4. Non-Exception Failures

- JS sometimes returns weird values instead of throwing errors:

  ```js
  const user = { name: "Daniel", age: 26 };
  console.log(user.location); // undefined, no error
  ```

- TS catches this as an error:

  ```ts
  user.location; // ❌ Property 'location' does not exist
  ```

---

### 5. Examples of Bugs TS Catches

- **Typos**

  ```ts
  const text = "Hello";
  text.toLowercase(); // ❌ no such method
  ```

- **Uncalled functions**

  ```ts
  function flipCoin() {
    return Math.random < 0.5; // ❌ comparing function, not number
  }
  ```

- **Logic errors**

  ```ts
  const val = Math.random() < 0.5 ? "a" : "b";
  if (val !== "a") { ... }
  else if (val === "b") { ... } // ❌ unreachable code
  ```

---

### 6. Tooling Support

- TS gives **autocompletion, hints, quick fixes** in editors.
  Example: typing `res.sen` → suggests `.send`, `.sendFile`, etc.
- Makes coding smoother + fewer mistakes.

---

### 7. TypeScript Compiler (`tsc`)

- Installed via:

  ```bash
  npm install -g typescript
  ```

- Compiles `.ts` → `.js`.
- Example:

  ```ts
  // hello.ts
  console.log("Hello world!");
  ```

  ```bash
  tsc hello.ts
  ```

  → outputs `hello.js`.

---

### 8. Type Annotations

- Add explicit types to functions:

  ```ts
  function greet(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}`);
  }

  greet("Maddison", new Date()); // ✅
  greet("Maddison", Date()); // ❌ string not Date
  ```

- TS can **infer types** automatically too:

  ```ts
  let msg = "hi"; // inferred as string
  ```

---

### 9. Erased Types

- Types disappear after compilation → only JS runs.
- Example:

  ```ts
  function greet(person: string) {
    console.log("Hi " + person);
  }
  ```

  Compiles to:

  ```js
  function greet(person) {
    console.log("Hi " + person);
  }
  ```

---

### 10. Downleveling

- TS can convert new JS features → older versions (ES5, ES2015).
- Example: Template strings `` `Hello ${name}` `` → string concatenation `"Hello " + name`.

---

### 11. Strictness Settings

- **Default**: loose (easy migration from JS).
- **Strict mode**: catches more bugs. Enable with:

  ```json
  "strict": true
  ```

- Two important flags:

  - `noImplicitAny`: stop TS from assuming `any`.
  - `strictNullChecks`: force handling of `null` & `undefined`.

---

# 🚀 Summary

- **JavaScript**: only runtime checking → errors show up late.
- **TypeScript**: static type-checking → catches errors before running.
- Adds **type annotations, strictness, tooling, compiler** → cleaner, safer code.
- Think of it as **JavaScript with safety goggles and auto-suggestions**.

---
