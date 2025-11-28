# TypeScript Object Types - Study Notes

## Core Concepts

**Object Types** are the fundamental way to group and pass data in TypeScript. They can be defined in three ways:

1. **Anonymous objects**: `{ name: string; age: number }`
2. **Interfaces**: `interface Person { name: string; age: number }`
3. **Type aliases**: `type Person = { name: string; age: number }`

## Property Modifiers

### Optional Properties (`?`)

- Mark properties as optional with `?` after the property name
- Optional properties can be `undefined`
- Use default values in destructuring to handle undefined cases
- Example: `interface PaintOptions { xPos?: number; yPos?: number }`

### Readonly Properties

- Prevent property reassignment during type-checking
- Syntax: `readonly prop: string`
- **Important**: Only prevents reassignment of the property itself, not mutation of nested objects
- Can be removed using mapping modifiers
- Doesn't affect runtime behavior

### Index Signatures

- Used when you don't know all property names ahead of time
- Syntax: `[index: number]: string` or `[propName: string]: unknown`
- Allowed index types: `string`, `number`, `symbol`, template string patterns, and unions of these
- All properties must match the index signature's return type (unless using unions)
- Can be made `readonly`

## Advanced Features

### Excess Property Checking

- TypeScript performs stricter checks on object literals assigned directly to variables
- Prevents typos and unexpected properties
- **Workarounds**:
  - Type assertions: `as SquareConfig`
  - Index signatures: `[propName: string]: unknown`
  - Assign to intermediate variable first

### Extending Types

**Interface Extension (`extends`)**

```typescript
interface BasicAddress {
  street: string;
  city: string;
}
interface AddressWithUnit extends BasicAddress {
  unit: string;
}
```

**Intersection Types (`&`)**

```typescript
type ColorfulCircle = Colorful & Circle;
```

**Key Difference**: Interfaces with conflicting properties cause errors; intersections create `never` types.

## Generic Object Types

### Basic Generics

- Use type parameters to create reusable types
- Syntax: `interface Box<Type> { contents: Type }`
- Eliminates need for multiple similar interfaces
- Works with both interfaces and type aliases

### Built-in Generic Types

- **Array**: `Array<Type>` (shorthand: `Type[]`)
- **ReadonlyArray**: `ReadonlyArray<Type>` (shorthand: `readonly Type[]`)
- **Map**: `Map<K, V>`
- **Set**: `Set<T>`
- **Promise**: `Promise<T>`

## Tuple Types

### Basic Tuples

- Arrays with fixed length and known types at specific positions
- Example: `type StringNumberPair = [string, number]`
- Support array destructuring
- Provide index-based type checking

### Advanced Tuple Features

- **Optional elements**: `[number, number, number?]` (only at the end)
- **Rest elements**: `[string, number, ...boolean[]]`
- **Readonly tuples**: `readonly [string, number]`

### Tuple Use Cases

- Convention-based APIs
- Function parameter lists
- Rest parameters with minimum element requirements
- Type-safe destructuring

## Quick Reference Examples

### Property Modifiers

```typescript
interface Example {
  required: string; // Required property
  optional?: number; // Optional property
  readonly constant: boolean; // Readonly property
  [key: string]: unknown; // Index signature
}
```

### Extending vs Intersection

```typescript
// Interface extension
interface Base {
  x: number;
}
interface Extended extends Base {
  y: string;
}

// Intersection type
type Intersected = Base & { y: string };
```

### Generic Patterns

```typescript
// Generic interface
interface Container<T> {
  value: T;
}

// Generic type alias
type Result<T, E> = { success: true; data: T } | { success: false; error: E };

// Generic function
function identity<T>(arg: T): T {
  return arg;
}
```

### Tuple Variations

```typescript
type Basic = [string, number]; // Basic tuple
type Optional = [string, number?]; // Optional element
type Rest = [string, ...number[]]; // Rest elements
type Readonly = readonly [string, number]; // Readonly tuple
```

## Best Practices

1. **Use `readonly` when appropriate** - especially for tuples and arrays that shouldn't be modified
2. **Prefer interfaces for object shapes** that might be extended
3. **Use type aliases for unions and computed types**
4. **Consider generic types** to reduce code duplication
5. **Be mindful of excess property checking** - it usually catches real bugs
6. **Use tuple types sparingly** - objects with named properties are often clearer

## Common Patterns

### Safe Property Access

```typescript
function getValue(obj: { prop?: string }) {
  // Safe access with default
  const value = obj.prop ?? "default";

  // Type guard
  if (obj.prop !== undefined) {
    // obj.prop is string here
    return obj.prop.toUpperCase();
  }
}
```

### Generic Constraints

```typescript
interface Lengthwise {
  length: number;
}

function withLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // OK, has .length property
  return arg;
}
```

### Utility Types with Objects

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // All properties optional
type UserEmail = Pick<User, "email">; // Only email property
type UserWithoutId = Omit<User, "id">; // All except id
```

## Key Takeaways

- TypeScript's type system is structural, not nominal
- `readonly` is a compile-time constraint, not runtime
- Excess property checking helps catch common mistakes
- Generics provide type safety without sacrificing reusability
- Tuples are useful for fixed-length arrays with known types at specific positions
- Choose between interfaces and type aliases based on extensibility needs
