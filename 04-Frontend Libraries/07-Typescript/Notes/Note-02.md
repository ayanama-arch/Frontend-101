# 📘 TypeScript Everyday Types — Notes

## 1. Primitives

- **string** → `"hello"`
- **number** → `42` (no separate int/float; everything is `number`)
- **boolean** → `true | false`
  ⚠️ Don’t confuse with `String`, `Number`, `Boolean` (capitalized = special built-ins). Always use lowercase.

---

## 2. Arrays

- `number[]` → array of numbers
- `Array<string>` → same as `string[]`
  ⚠️ `[number]` = **tuple**, not array.

---

## 3. `any`

- Disables type checking. You can call anything, assign anything.
- Example:

  ```ts
  let obj: any = { x: 0 };
  obj.foo();
  obj = "hi";
  ```

- Avoid overusing. Use `noImplicitAny` flag to catch implicit `any`.

---

## 4. Type Annotations

- After variable:

  ```ts
  let name: string = "Alice";
  ```

- Usually **not needed**; TypeScript **infers** from initializer.

---

## 5. Functions

### Parameter & Return Types

```ts
function greet(name: string): void {
  console.log("Hello " + name);
}
```

- Return type is inferred unless specified.

### Promises

```ts
async function getNum(): Promise<number> {
  return 42;
}
```

### Anonymous Functions

- Context gives types:

  ```ts
  names.forEach((s) => console.log(s.toUpperCase()));
  ```

---

## 6. Object Types

```ts
function printCoord(pt: { x: number; y: number }) {
  console.log(pt.x, pt.y);
}
```

- Optional property:

  ```ts
  { last?: string }
  ```

---

## 7. Union Types

- Combine with `|`

  ```ts
  function printId(id: number | string) { ... }
  ```

- Must **narrow** before using type-specific methods:

  ```ts
  if (typeof id === "string") id.toUpperCase();
  ```

---

## 8. Type Aliases

- Give a name to a type:

  ```ts
  type Point = { x: number; y: number };
  ```

---

## 9. Interfaces

- Alternative to type alias:

  ```ts
  interface Point {
    x: number;
    y: number;
  }
  ```

- Difference:

  - **Interface** = extendable / can be reopened.
  - **Type alias** = fixed, but can use intersections.

---

## 10. Type Assertions

- Tell TS “trust me”:

  ```ts
  const canvas = document.getElementById("c") as HTMLCanvasElement;
  ```

- `!` operator removes null/undefined check:

  ```ts
  value!.toFixed();
  ```

---

## 11. Literal Types

- Specific values as types:

  ```ts
  let dir: "left" | "right";
  ```

- Works with string, number, boolean.

---

## 12. `null` & `undefined`

- Controlled by `strictNullChecks`.
- With it **on**, you must handle null/undefined safely.

---

## 13. Enums

- TypeScript-only feature for named constants.
  ⚠️ Use sparingly; often `union of literals` is better.

---

## 14. Less Common Primitives

- **bigint** → for huge numbers (`100n`, `BigInt(100)`)
- **symbol** → unique references (`Symbol("name")`)

---

✅ **Rule of thumb for a noob**:

- Use **type inference** when possible.
- Use `string | number` unions for flexibility.
- Use **interfaces** for object contracts, **types** when mixing unions & primitives.
- Avoid `any` unless really necessary.

---
