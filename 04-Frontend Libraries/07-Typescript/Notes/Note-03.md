# TypeScript Narrowing - Study Notes

## What is Narrowing?

**Narrowing** is TypeScript's process of refining union types to more specific types based on runtime checks. It helps TypeScript understand which specific type a variable has at different points in your code.

## Core Narrowing Techniques

### 1. `typeof` Type Guards

```typescript
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // padding is now type 'number'
  }
  return padding + input; // padding is now type 'string'
}
```

**typeof returns:** `"string"`, `"number"`, `"bigint"`, `"boolean"`, `"symbol"`, `"undefined"`, `"object"`, `"function"`

**Important:** `typeof null === "object"` (JavaScript quirk!)

### 2. Truthiness Narrowing

Uses JavaScript's falsy values to narrow types:

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    // strs is now string[] (not null)
    for (const s of strs) {
      console.log(s);
    }
  }
}
```

**Falsy values:** `0`, `NaN`, `""`, `0n`, `null`, `undefined`

### 3. Equality Narrowing

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // Both x and y must be strings (only common type)
    x.toUpperCase(); // ✅ Works
    y.toLowerCase(); // ✅ Works
  }
}

// Null checking
if (container.value != null) {
  // Removes both null AND undefined
  container.value *= factor; // ✅ Safe
}
```

### 4. `in` Operator Narrowing

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim(); // animal is Fish
  }
  return animal.fly(); // animal is Bird
}
```

### 5. `instanceof` Narrowing

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString()); // x is Date
  } else {
    console.log(x.toUpperCase()); // x is string
  }
}
```

### 6. Assignment Narrowing

```typescript
let x: string | number = Math.random() < 0.5 ? 10 : "hello";
x = 1; // x is now number
x = "goodbye"; // x is now string
// x = true; // ❌ Error: boolean not assignable
```

## Advanced Narrowing

### Type Predicates (Custom Type Guards)

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim(); // pet is Fish
} else {
  pet.fly(); // pet is Bird
}
```

### Discriminated Unions

Use a common property to distinguish between types:

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // shape is Circle
    case "square":
      return shape.sideLength ** 2; // shape is Square
  }
}
```

### Exhaustiveness Checking with `never`

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // Ensures all cases handled
      return _exhaustiveCheck;
  }
}
```

## Key Concepts

**Control Flow Analysis:** TypeScript tracks how types change as code executes, including through branches, loops, and early returns.

**Type Guards:** Special conditions that TypeScript recognizes to narrow types automatically.

**Never Type:** Represents impossible states - useful for exhaustiveness checking and catching missing cases.

## Best Practices

1. **Prefer explicit checks** over non-null assertions (`!`)
2. **Use discriminated unions** for complex object types
3. **Implement exhaustiveness checking** with `never` type
4. **Be careful with truthiness checks** on primitives (empty strings are falsy!)
5. **Leverage control flow analysis** - TypeScript is smart about unreachable code
