# TypeScript Functions - Study Notes

## Function Type Expressions

**Basic Syntax:**

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
```

- `(a: string) => void` means: function with one parameter `a` of type `string`, returns nothing
- Parameter name is **required** in type expression
- `(string) => void` means: function with parameter named `string` of type `any` (confusing!)
- If parameter type isn't specified, it's implicitly `any`

**Type Aliases for Functions:**

```typescript
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  /* ... */
}
```

## Call Signatures

For functions that have properties AND are callable:

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean; // Call signature
};
```

- Use `:` between parameters and return type (not `=>`)
- Allows functions to have both properties and be callable

## Construct Signatures

For functions that can be invoked with `new`:

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
```

**Combined Call and Construct:**

```typescript
interface CallOrConstruct {
  (n?: number): string; // Call signature
  new (s: string): Date; // Construct signature
}
```

## Generic Functions

### Basic Generic Functions

```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// Usage - TypeScript infers the type
const s = firstElement(["a", "b", "c"]); // s: string
const n = firstElement([1, 2, 3]); // n: number
```

### Type Inference

- TypeScript can automatically infer generic types
- Multiple type parameters are supported:

```typescript
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}
```

### Constraints

Limit generic types using `extends`:

```typescript
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) return a;
  else return b;
}
```

**Important:** Function must return the same type as passed in, not just something matching the constraint.

### Specifying Type Arguments

```typescript
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

## Guidelines for Good Generic Functions

### 1. Push Type Parameters Down

```typescript
// Good
function firstElement1<Type>(arr: Type[]) {
  return arr[0]; // return type: Type
}

// Bad
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0]; // return type: any
}
```

### 2. Use Fewer Type Parameters

```typescript
// Good
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

// Bad - unnecessary extra type parameter
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  /* ... */
}
```

### 3. Type Parameters Should Appear Twice

```typescript
// Bad - Str only used once
function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}

// Good - no generics needed
function greet(s: string) {
  console.log("Hello, " + s);
}
```

## Optional Parameters

### Basic Optional Parameters

```typescript
function f(x?: number) {
  // x has type: number | undefined
}

f(); // OK
f(10); // OK
f(undefined); // OK
```

### Parameter Defaults

```typescript
function f(x = 10) {
  // x has type: number (undefined replaced with 10)
}
```

### Optional Parameters in Callbacks

**❌ Wrong:**

```typescript
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  // This suggests callback might be called with just one argument
}
```

**✅ Correct:**

```typescript
function myForEach(arr: any[], callback: (arg: any, index: number) => void) {
  // Callback will always be called with both arguments
}
```

**Rule:** Never write optional parameters in callbacks unless you intend to call the function without that argument.

## Function Overloads

Multiple function signatures for different argument patterns:

```typescript
function makeDate(timestamp: number): Date; // Overload 1
function makeDate(m: number, d: number, y: number): Date; // Overload 2
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  // Implementation
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

### Key Points:

- Implementation signature is NOT visible from outside
- Implementation must be compatible with all overload signatures
- Always prefer union types over overloads when possible:

```typescript
// Better than overloads
function len(x: any[] | string) {
  return x.length;
}
```

## Declaring `this` in Functions

```typescript
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}

const admins = db.filterUsers(function (this: User) {
  return this.admin; // this is properly typed as User
});
```

**Note:** Use `function` declarations, not arrow functions, for `this` typing.

## Important Types

### `void`

- Represents functions that don't return a value
- Different from `undefined`
- Contextual typing with `void` allows functions to return values (they're just ignored)

### `object`

- Any non-primitive value
- Different from `{}` and `Object`
- Always use `object`, not `Object`

### `unknown`

- Safer alternative to `any`
- Cannot do anything with `unknown` value without type checking
- Good for functions accepting any value

### `never`

- Functions that never return (throw errors or infinite loops)
- Values that are never observed
- Appears in exhausted union types

### `Function`

- Global type for any function
- Returns `any` when called
- Generally avoid - use `() => void` instead

## Rest Parameters and Arguments

### Rest Parameters

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
```

### Rest Arguments (Spread)

```typescript
const args = [8, 5] as const; // Use const assertion
const angle = Math.atan2(...args);
```

## Parameter Destructuring

```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}

// Or with type alias
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
```

## Function Assignability

### `void` Return Type Behavior

- Contextual `void` functions can return any value (ignored)
- Literal `void` functions must not return anything

```typescript
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true; // OK - value ignored
};

function f2(): void {
  return true; // Error - literal function can't return
}
```

This enables patterns like:

```typescript
src.forEach((el) => dst.push(el)); // push returns number, but forEach expects void
```
