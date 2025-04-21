### **Lists**

#### 🔢 **Ordered Lists (`<ol>`)**

- Displays a **numbered** list.
- Each item inside is wrapped with `<li>`.
- Example:
  ```html
  <ol>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
  </ol>
  ```

#### • **Unordered Lists (`<ul>`)**

- Displays a **bulleted** list.
- Also uses `<li>` for each item.
- Example:
  ```html
  <ul>
    <li>Apples</li>
    <li>Bananas</li>
    <li>Oranges</li>
  </ul>
  ```

#### 📖 **Definition Lists (`<dl>`)**

- Used for terms and their definitions.
- Contains:
  - `<dt>` — Definition Term
  - `<dd>` — Definition Description
- Example:
  ```html
  <dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
  </dl>
  ```

#### 🔄 **Nested Lists**

- A list **inside another list**.
- Can be ordered inside unordered or vice versa.
- Example:
  ```html
  <ul>
    <li>
      Fruits
      <ul>
        <li>Apple</li>
        <li>Mango</li>
      </ul>
    </li>
    <li>Vegetables</li>
  </ul>
  ```

---

### 📷 **Images**

#### 🧱 **Image Syntax and Attributes**

- HTML tag: `<img>`
- **Self-closing** tag (no closing tag needed).
- Essential attributes:
  - `src`: Source/path of the image.
  - `alt`: Alternative text.
- Example:
  ```html
  <img src="cat.jpg" alt="A cute cat" />
  ```

#### 📝 **Alt Text (`alt`)**

- Describes the image **if it fails to load** or for **screen readers** (accessibility).
- Should be clear and relevant.
- Example:
  ```html
  <img src="logo.png" alt="Company Logo" />
  ```

#### 📐 **Image Dimensions**

- Controlled with `width` and `height` attributes (pixels or %).
- Can also be styled via CSS.
- Example:
  ```html
  <img src="banner.jpg" alt="Banner" width="300" height="150" />
  ```

#### 🖼️ **Image Formats**

- Common formats:
  - **JPEG (.jpg/.jpeg)**: Good for photos, compressed.
  - **PNG (.png)**: Supports transparency, better for graphics/icons.
  - **GIF (.gif)**: For animations or simple graphics.
  - **SVG (.svg)**: Scalable vector format, great for icons and logos.
  - **WEBP (.webp)**: Modern format, smaller size with good quality.

---

### 📋 **HTML Table Notes**

---

#### 🧱 **Basic Table Structure**

- A table is defined using the `<table>` tag.
- Contains rows (`<tr>`) and cells:
  - `<th>` = table **header** (bold + centered by default)
  - `<td>` = table **data** (regular cells)

```html
<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alice</td>
    <td>24</td>
  </tr>
</table>
```

---

#### 🔝 **`<thead>`**

- Defines the **table header section**.
- Groups header rows inside `<tr>` using `<th>`.
- Helps with accessibility and JS-based sorting.

```html
<thead>
  <tr>
    <th>Item</th>
    <th>Price</th>
  </tr>
</thead>
```

---

#### 📦 **`<tbody>`**

- Contains the **main data rows** of the table.
- Placed after `<thead>`.

```html
<tbody>
  <tr>
    <td>Laptop</td>
    <td>$999</td>
  </tr>
</tbody>
```

---

#### 📉 **`<tfoot>`** _(optional)_

- Defines a footer for summary rows (totals, notes, etc.).
- Placed **after `<tbody>`** in HTML, but can be rendered at the bottom visually.

```html
<tfoot>
  <tr>
    <td>Total</td>
    <td>$1498</td>
  </tr>
</tfoot>
```

---

#### 🎨 **Basic Styling**

Use CSS or attributes to style tables:

```css
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
```

---

#### 🧠 **Tips**

- Use `<thead>`, `<tbody>`, and `<tfoot>` for **clean structure** and **better styling**.
- Tables are great for **structured data**, but avoid using them for page layout.

---

### 📝 **8. Simple Forms**

---

#### 🧱 **Form Structure**

- Forms are defined using the `<form>` tag.
- Attributes:
  - `action`: URL where the form data is sent.
  - `method`: HTTP method (`GET` or `POST`).

```html
<form action="/submit" method="post">
  <!-- form elements go here -->
</form>
```

---

#### 🔤 **Basic Input Types**

Used with the `<input>` tag. Common types:

| Type       | Description            |
| ---------- | ---------------------- |
| `text`     | Single-line text input |
| `password` | Hidden characters      |
| `email`    | Validates email format |
| `number`   | Numeric input          |
| `checkbox` | Toggle option          |
| `radio`    | Select one from group  |
| `date`     | Select a date          |

**Example:**

```html
<input type="text" name="username" />
<input type="password" name="password" />
<input type="email" name="email" />
```

---

#### 🏷️ **Labels**

- Use `<label>` to describe an input.
- For accessibility, use `for` attribute that matches input `id`.

```html
<label for="email">Email:</label> <input type="email" id="email" name="email" />
```

---

#### 🚀 **Submit Buttons**

- Used to submit the form data.
- Common tags:
  - `<input type="submit">`
  - `<button type="submit">`

```html
<input type="submit" value="Register" />
<!-- OR -->
<button type="submit">Submit</button>
```

---

### ✅ **Example Form**

```html
<form action="/register" method="post">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" /><br /><br />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" /><br /><br />

  <button type="submit">Submit</button>
</form>
```

---
