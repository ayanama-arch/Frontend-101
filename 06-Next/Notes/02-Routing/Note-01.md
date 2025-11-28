# Complete Next.js Routing Guide

## Basic Static Routes

### App Router Structure

```
app/
├── page.js          // → /
├── about/
│   └── page.js      // → /about
├── contact/
│   └── page.js      // → /contact
└── services/
    └── page.js      // → /services
```

### Example Files

**app/page.js** (Home page)

```jsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <p>This is the root route "/"</p>
    </div>
  );
}
```

**app/about/page.js**

```jsx
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This page is accessible at "/about"</p>
    </div>
  );
}
```

---

## Dynamic Routes

### Single Dynamic Segment

```
app/
├── blog/
│   └── [slug]/
│       └── page.js  // → /blog/hello-world, /blog/nextjs-guide
```

**app/blog/[slug]/page.js**

```jsx
export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
      <p>URL: /blog/{slug}</p>
    </div>
  );
}
```

### Multiple Dynamic Segments

```
app/
├── shop/
│   └── [category]/
│       └── [product]/
│           └── page.js  // → /shop/electronics/laptop
```

**app/shop/[category]/[product]/page.js**

```jsx
export default function Product({ params }) {
  const { category, product } = params;

  return (
    <div>
      <h1>Product: {product}</h1>
      <p>Category: {category}</p>
      <p>
        URL: /shop/{category}/{product}
      </p>
    </div>
  );
}
```

### Catch-All Routes

```
app/
├── docs/
│   └── [...slug]/
│       └── page.js  // → /docs/a, /docs/a/b, /docs/a/b/c
```

**app/docs/[...slug]/page.js**

```jsx
export default function Docs({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Documentation</h1>
      <p>Path segments: {slug?.join(" / ")}</p>
      <p>URL: /docs/{slug?.join("/")}</p>
    </div>
  );
}
```

### Optional Catch-All Routes

```
app/
├── shop/
│   └── [[...filters]]/
│       └── page.js  // → /shop, /shop/category, /shop/category/brand
```

**app/shop/[[...filters]]/page.js**

```jsx
export default function Shop({ params }) {
  const { filters } = params;

  return (
    <div>
      <h1>Shop</h1>
      {filters ? (
        <p>Filters: {filters.join(" / ")}</p>
      ) : (
        <p>No filters applied</p>
      )}
    </div>
  );
}
```

---

## Nested Routes

### Layout Files

Layouts wrap pages and persist across route changes.

```
app/
├── layout.js       // Root layout
├── page.js         // Home page
├── dashboard/
│   ├── layout.js   // Dashboard layout
│   ├── page.js     // → /dashboard
│   ├── settings/
│   │   └── page.js // → /dashboard/settings
│   └── profile/
│       └── page.js // → /dashboard/profile
```

**app/layout.js** (Root Layout)

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Global Navigation</nav>
        </header>
        <main>{children}</main>
        <footer>Global Footer</footer>
      </body>
    </html>
  );
}
```

**app/dashboard/layout.js**

```jsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>
        <nav>
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/dashboard/settings">Settings</a>
            </li>
            <li>
              <a href="/dashboard/profile">Profile</a>
            </li>
          </ul>
        </nav>
      </aside>
      <section>{children}</section>
    </div>
  );
}
```

---

## Route Groups

Group routes without affecting URL structure using parentheses.

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.js    // → /about
│   └── contact/
│       └── page.js    // → /contact
├── (shop)/
│   ├── products/
│   │   └── page.js    // → /products
│   └── cart/
│       └── page.js    // → /cart
└── page.js            // → /
```

**Benefits:**

- Organize routes logically
- Apply different layouts to different groups
- Create multiple root layouts

**app/(marketing)/layout.js**

```jsx
export default function MarketingLayout({ children }) {
  return (
    <div>
      <header>Marketing Header</header>
      {children}
    </div>
  );
}
```

---

## Parallel Routes

Display multiple pages simultaneously using named slots.

```
app/
├── layout.js
├── page.js
├── @analytics/
│   └── page.js
├── @team/
│   └── page.js
└── settings/
    ├── @analytics/
    │   └── page.js
    └── @team/
        └── page.js
```

**app/layout.js**

```jsx
export default function Layout({ children, analytics, team }) {
  return (
    <div>
      <div>{children}</div>
      <div>{analytics}</div>
      <div>{team}</div>
    </div>
  );
}
```

**app/@analytics/page.js**

```jsx
export default function Analytics() {
  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <p>User metrics and data</p>
    </div>
  );
}
```

---

## Intercepting Routes

Intercept routes to show content in modal while keeping URL.

```
app/
├── feed/
│   └── page.js
├── photo/
│   └── [id]/
│       └── page.js     // → /photo/123 (direct access)
└── @modal/
    └── (.)photo/
        └── [id]/
            └── page.js // → /photo/123 (intercepted)
```

**Conventions:**

- `(.)` - same level
- `(..)` - one level up
- `(..)(..)` - two levels up
- `(...)` - from root

**app/@modal/(.)photo/[id]/page.js**

```jsx
export default function PhotoModal({ params }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Photo Modal</h2>
        <p>Photo ID: {params.id}</p>
        <img src={`/photos/${params.id}.jpg`} alt="Photo" />
      </div>
    </div>
  );
}
```

---

## API Routes

Create backend API endpoints.

### App Router API Routes

```
app/
├── api/
│   ├── users/
│   │   └── route.js     // → /api/users
│   ├── users/
│   │   └── [id]/
│   │       └── route.js // → /api/users/123
│   └── posts/
│       └── route.js     // → /api/posts
```

**app/api/users/route.js**

```javascript
// GET /api/users
export async function GET() {
  const users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];

  return Response.json(users);
}

// POST /api/users
export async function POST(request) {
  const body = await request.json();

  // Create new user logic
  const newUser = { id: 3, name: body.name };

  return Response.json(newUser, { status: 201 });
}
```

**app/api/users/[id]/route.js**

```javascript
// GET /api/users/123
export async function GET(request, { params }) {
  const { id } = params;

  const user = { id: parseInt(id), name: "John Doe" };

  return Response.json(user);
}

// PUT /api/users/123
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();

  const updatedUser = { id: parseInt(id), name: body.name };

  return Response.json(updatedUser);
}

// DELETE /api/users/123
export async function DELETE(request, { params }) {
  const { id } = params;

  // Delete user logic

  return new Response(null, { status: 204 });
}
```

---

## Middleware

Execute code before request completion.

**middleware.js** (in root directory)

```javascript
import { NextResponse } from "next/server";

export function middleware(request) {
  // Check authentication
  const token = request.cookies.get("token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Add custom header
  const response = NextResponse.next();
  response.headers.set("X-Custom-Header", "Hello from middleware");

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
```

---

## Navigation

### Link Component

```jsx
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      {/* Static routes */}
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>

      {/* Dynamic routes */}
      <Link href="/blog/my-first-post">Blog Post</Link>
      <Link href="/shop/electronics/laptop">Laptop</Link>

      {/* Query parameters */}
      <Link href="/search?q=nextjs">Search</Link>

      {/* Object syntax */}
      <Link
        href={{
          pathname: "/shop/[category]/[product]",
          query: { category: "electronics", product: "laptop" },
        }}
      >
        Laptop
      </Link>
    </nav>
  );
}
```

### useRouter Hook

```jsx
"use client";
import { useRouter } from "next/navigation";

export default function MyComponent() {
  const router = useRouter();

  const handleNavigation = () => {
    // Programmatic navigation
    router.push("/dashboard");

    // Replace current entry
    router.replace("/login");

    // Go back
    router.back();

    // Refresh current route
    router.refresh();
  };

  return <button onClick={handleNavigation}>Navigate</button>;
}
```

### useParams Hook

```jsx
"use client";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();

  return (
    <div>
      <h1>Product: {params.product}</h1>
      <p>Category: {params.category}</p>
    </div>
  );
}
```

### useSearchParams Hook

```jsx
"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {query}</p>
      <p>Category: {category}</p>
    </div>
  );
}
```

---

## Quick Reference

### File Naming Conventions

- `page.js` - Creates a route
- `layout.js` - Shared UI for segments
- `loading.js` - Loading UI
- `error.js` - Error UI
- `not-found.js` - 404 UI
- `route.js` - API endpoints

### Route Types Summary

1. **Static**: `/about` → `app/about/page.js`
2. **Dynamic**: `/blog/[slug]` → `app/blog/[slug]/page.js`
3. **Catch-all**: `/docs/[...slug]` → `app/docs/[...slug]/page.js`
4. **Optional catch-all**: `/shop/[[...filters]]` → `app/shop/[[...filters]]/page.js`
5. **Route groups**: `(marketing)` - organizes without affecting URLs
6. **Parallel**: `@analytics` - multiple pages simultaneously
7. **Intercepting**: `(.)photo` - show content while preserving URL

### Common Patterns

- Use layouts for shared UI
- Group related routes with route groups
- Use dynamic routes for content that changes
- Implement API routes for backend functionality
- Use middleware for authentication and redirects
