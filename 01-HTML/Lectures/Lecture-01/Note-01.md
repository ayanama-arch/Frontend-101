# Lecture-01

## Basic Blocks of HTML

Before Deep diving in html let's start from the basics and fundamental blocks of html.

### 🔎 **1. SGML (Standard Generalized Markup Language)**

- **Definition**: SGML is a **standard** for defining markup languages, used to describe documents in a machine-readable way.
- **Purpose**: It allows users to define custom tags, making documents flexible.
- **DTD** (Document Type Definition): SGML requires a DTD to define the structure and rules of a document.

---

### 🧩 **2. DTD (Document Type Definition)**

- **Definition**: A **DTD** is a set of rules that defines the structure of an SGML or XML document.
- **Purpose**: It specifies which elements can appear, their order, and data types.
- **Types**:
  - **Internal DTD**: Embedded in the document.
  - **External DTD**: Stored in a separate file.
- **Example**:
  ```sgml
  <!ELEMENT book (title, author, chapter+)>
  ```
- **Usage**: DTD ensures that documents follow the same structure and formatting rules.

---

### 🌐 **3. Doctype**

- **Definition**: A **DOCTYPE** declaration tells the browser what type of document it is and which rules to follow for rendering.
- **Purpose**: It specifies whether the document follows **HTML5**, **HTML 4**, or other formats.

#### **DOCTYPE Syntax Examples:**

- **HTML5**:
  ```html
  <!DOCTYPE html>
  ```
- **HTML 4**:
  ```html
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
  ```

---

### 🧪 **4. Quirks Mode vs Standards Mode**

- **Quirks Mode**: A fallback mode in browsers for old documents with missing or incorrect DOCTYPE. It renders HTML based on outdated rules (e.g., box model behavior).
- **Standards Mode**: Ensures that the page follows **modern web standards** defined by W3C.
- **Key Difference**: Quirks mode may break layouts (like box model issues), while standards mode ensures consistent rendering across browsers.

#### **Example**:

```html
<!DOCTYPE html>
<!-- This triggers Standards Mode -->
<html>
  <!-- Without DOCTYPE triggers Quirks Mode -->
</html>
```

---

### 📦 **5. HTML5 & DTD**

- **HTML5** does **not** require a DTD. The `<!DOCTYPE html>` declaration is a simplified instruction that tells browsers to render the page in **standards mode**.
- Unlike HTML 4, HTML5 **does not** use a traditional DTD system, making it simpler and more flexible.

---

### 🧱 **6. Box Model Differences (Quirks Mode vs Standards Mode)**

- **Standards Mode**: The width is **content width only**, and padding/border are added outside.
- **Quirks Mode**: The width includes padding and border as part of the total width.

#### **Example CSS**:

```css
div {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
}
```

- **In Standards Mode**: Total width = `200px (content) + 20px padding + 5px border = 250px`.
- **In Quirks Mode**: Total width = `200px (including padding/border)`.

---

### 🔄 **7. Modern Browser Behavior**

- **Modern Browsers** (like Chrome and Firefox) are **forgiving** and sometimes treat documents with no DOCTYPE as **“almost standards mode”**, preventing quirks.
- Despite this, **quirks mode** can still cause odd behavior with certain old CSS tricks or layout bugs.

---

### 🧩 **8. `<!DOCTYPE html>` in HTML5**

- **Purpose**: Tells the browser to render the page in **standards mode**.
- **Key Detail**: **No DTD** behind it — just a mode indicator.

---

### 🔑 **9. Practical Tips**:

1. Always include the `<!DOCTYPE html>` in your HTML files to avoid **quirks mode**.
2. Use **standards mode** to ensure cross-browser consistency.
3. **Validate HTML** using tools like W3C Validator to check compliance with modern standards.

---

### ✅ **Key Takeaways for Boss**:

- SGML → DTD → **DOCTYPE** → **Standards Mode/Quirks Mode**.
- **HTML5** doesn’t need a DTD but uses `<!DOCTYPE html>` to render in standards mode.
- Understanding **quirks mode** vs **standards mode** ensures proper layout rendering.

---
