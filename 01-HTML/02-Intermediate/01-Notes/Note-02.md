## ⚡ Metadata in HTML – Quick Notes

### 1. **Meta Tags**

- Placed inside `<head>`.
- Provide **information about the page**, not shown directly on the page.
- Used for SEO, encoding, viewport control, etc.

**Common meta tags:**

```html
<meta charset="UTF-8" />
<!-- character encoding -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- responsive design -->
<meta name="description" content="Best phone comparison site for 2025" />
<!-- SEO -->
<meta name="keywords" content="phones, specs, comparison, reviews" />
<!-- less used today -->
<meta name="author" content="Ayan Khan" />
```

---

### 2. **Open Graph Protocol (OG)**

- Created by Facebook.
- Makes your link look good when shared on social media.
- Defines **title, description, image, type, URL**.

**Example:**

```html
<meta property="og:title" content="PhoneSpecs – Compare Latest Phones" />
<meta
  property="og:description"
  content="Find the best phone under your budget with full specs."
/>
<meta property="og:image" content="https://phonespecs.tech/og-image.jpg" />
<meta property="og:url" content="https://phonespecs.tech" />
<meta property="og:type" content="website" />
```

---

### 3. **Twitter Cards**

- Similar to Open Graph but **for Twitter (X)**.
- Show rich previews (image, title, description).

**Example:**

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="PhoneSpecs – Best Phone Comparison" />
<meta
  name="twitter:description"
  content="Compare latest smartphones with prices and reviews."
/>
<meta
  name="twitter:image"
  content="https://phonespecs.tech/twitter-image.jpg"
/>
<meta name="twitter:site" content="@PhoneSpecs" />
```

---

### 4. **Favicon**

- Small icon displayed in browser tabs, bookmarks, search results.
- Typically `favicon.ico` (16×16 or 32×32 px), but PNG works too.

**Example:**

```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-icon.png" />
<!-- iOS devices -->
```

---

#### 🗝️ Takeaway

- **Meta tags** = SEO, encoding, viewport.
- **Open Graph** = rich preview on Facebook/LinkedIn.
- **Twitter cards** = rich preview on Twitter.
- **Favicon** = brand identity in browser tabs.

---

## **HTML Entities & Special Characters (Revision)**

### 1. **Character Entities**

- Syntax: `&name;` or `&#code;`
- Used when a character conflicts with HTML.
- Ex: `&lt;` = `<`, `&gt;` = `>`, `&amp;` = `&`.

---

### 2. **Reserved Characters**

- Special meaning in HTML → must be escaped.
- `<` = `&lt;`
- `>` = `&gt;`
- `&` = `&amp;`
- `"` = `&quot;`
- `'` = `&apos;`

---

### 3. **Symbols & Icons**

- Predefined entities for symbols.
- `&copy;` = ©
- `&reg;` = ®
- `&trade;` = ™
- `&hearts;` = ♥
- `&euro;` = €

---

### 4. **Unicode Characters**

- Universal character set (languages, math, emojis).
- Direct: 😀
- Decimal: `&#128512;` → 😀
- Hex: `&#x1F600;` → 😀

---

⚡ **Shortcut memory**:

- Entities = safe codes.
- Reserved = HTML core chars.
- Symbols = extras.
- Unicode = everything.

---
