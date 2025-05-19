### **1. HTML Parsing**

- **HTML Document**: The browser reads the HTML file and converts it into a **DOM** (Document Object Model).
- **DOM**: A tree-like structure representing the HTML elements as nodes (`<html>`, `<head>`, `<body>`, etc.).
- The **DOM** is the foundation for any web page content.

#### **Example of Real DOM**:

```javascript
{
  "nodeName": "HTML",
  "children": [
    {
      "nodeName": "HEAD",
      "children": [
        { "nodeName": "META", "attributes": { "charset": "UTF-8" } },
        { "nodeName": "TITLE", "textContent": "DOM & CSSOM Example" },
        { "nodeName": "STYLE", "textContent": "body { font-family: Arial, sans-serif; background-color: lightblue; }" }
      ]
    },
    {
      "nodeName": "BODY",
      "children": [
        { "nodeName": "H1", "textContent": "Welcome to the DOM & CSSOM example!" },
        { "nodeName": "P", "textContent": "This is a paragraph in the DOM." }
      ]
    }
  ]
}
```

- The **DOM** structure is a tree of HTML elements. For instance, `<html>` contains `<head>` and `<body>`, and `<body>` contains `<h1>` and `<p>` elements.

---

### **2. CSS Parsing**

- **CSS Styles**: The browser reads the CSS (inline, external, or internal) and creates a **CSSOM** (CSS Object Model).
- **CSSOM**: A structure representing the CSS rules and their associated styles (e.g., `color`, `font-size`).
- **CSSOM** stores how elements should look visually.

#### **Example of Real CSSOM**

```javascript
{
  "body": { "font-family": "Arial, sans-serif", "background-color": "lightblue" },
  "h1": { "color": "darkblue", "font-size": "40px" },
  "p": { "color": "green", "font-size": "20px" }
}
```

- **CSSOM** contains the styles for elements. For example, it stores the styles for `<body>`, `<h1>`, and `<p>`.

---

### **3. Combining DOM + CSSOM = Render Tree**

- The **DOM** and **CSSOM** are combined to create a **Render Tree**.
- The **Render Tree** includes only the elements that are visible (i.e., displayable on the screen), with styles applied.
- This is what the browser uses to render the page.

#### **Render Tree (Simplified)**:

```javascript
{
  "body": {
    "nodeName": "BODY",
    "styles": { "font-family": "Arial, sans-serif", "background-color": "lightblue" },
    "children": [
      { "nodeName": "H1", "textContent": "Welcome to the DOM & CSSOM example!", "styles": { "color": "darkblue", "font-size": "40px" } },
      { "nodeName": "P", "textContent": "This is a paragraph in the DOM.", "styles": { "color": "green", "font-size": "20px" } }
    ]
  }
}
```

- The **Render Tree** combines **DOM** and **CSSOM** to reflect the visible elements and their applied styles.

---

### **4. Layout & Painting**

- **Layout**: The browser calculates the position and size of each element in the Render Tree.
- **Painting**: The browser applies colors, images, and text based on styles, then displays the page visually.

---

### **5. JavaScript Interaction**

- **DOM Manipulation**: JavaScript can modify the **DOM** to add, remove, or change HTML elements.
- **CSSOM Manipulation**: JavaScript can also modify the **CSSOM** to change styles dynamically.
- This can trigger **reflows** (recalculating layout) or **repaints** (redrawing elements).

---

---

### **Key Concepts Recap**:

- **DOM**: Represents the structure of the HTML document as a tree of nodes (e.g., `<html>`, `<head>`, `<body>`, etc.).
  - Example:
    ```javascript
    {
      "nodeName": "HTML",
      "children": [
        {
          "nodeName": "BODY",
          "children": [
            { "nodeName": "H1", "textContent": "Welcome to the DOM & CSSOM example!" },
            { "nodeName": "P", "textContent": "This is a paragraph in the DOM." }
          ]
        }
      ]
    }
    ```
- **CSSOM**: Represents the styles applied to the HTML elements, also a tree structure.

  - Example:
    ```javascript
    {
      "body": { "font-family": "Arial, sans-serif", "background-color": "lightblue" },
      "h1": { "color": "darkblue", "font-size": "40px" },
      "p": { "color": "green", "font-size": "20px" }
    }
    ```

- **Render Tree**: A combined tree of both **DOM** and **CSSOM**, used to render the page visually.

  - Example:
    ```javascript
    {
      "body": {
        "nodeName": "BODY",
        "styles": { "font-family": "Arial, sans-serif", "background-color": "lightblue" },
        "children": [
          { "nodeName": "H1", "textContent": "Welcome to the DOM & CSSOM example!", "styles": { "color": "darkblue", "font-size": "40px" } },
          { "nodeName": "P", "textContent": "This is a paragraph in the DOM.", "styles": { "color": "green", "font-size": "20px" } }
        ]
      }
    }
    ```

- **Layout & Painting**: After the **Render Tree** is built, the browser positions elements (layout) and then applies styles to visually display them (painting).

---

### **Short Notes on the `lang` Attribute in HTML**

The `lang` attribute in HTML is used to specify the **language of the content** within an HTML document. This helps browsers, search engines, screen readers, and other tools understand how to process and present the content correctly.

#### **Key Points**:

1. **Purpose**:

   - It defines the **primary language** of the document’s content.
   - Helps **screen readers** pronounce text correctly by choosing the appropriate accent or language.
   - Enhances **SEO** by making content easier for search engines to index in the correct language.

2. **Syntax**:

   ```html
   <html lang="en"></html>
   ```

   - The `lang` attribute is added to the `<html>` tag.
   - It is typically set to a **language code** like `en` (English), `fr` (French), `hi` (Hindi), `es` (Spanish), etc.
   - You can use **specific region codes** like `en-US` for American English or `fr-CA` for Canadian French if the content uses a specific regional dialect.

3. **Language Codes**:

   - **ISO 639-1** language code (e.g., `en` for English, `fr` for French).
   - You can include **regional dialects** by appending a country code, such as `en-US` for American English, `en-GB` for British English, or `es-ES` for Spanish from Spain.
   - **Example**:
     - `lang="en"` — General English
     - `lang="en-US"` — American English
     - `lang="fr-CA"` — Canadian French
     - `lang="hi"` — Hindi

4. **Impact on Browsers**:

   - **Text Rendering**: The browser can apply language-specific fonts, text direction (e.g., **right-to-left** for Arabic), and styles.
   - **Spell Check**: Some browsers enable spell check for text areas based on the `lang` value.

5. **Impact on Accessibility**:

   - **Screen Readers**: The `lang` attribute tells screen readers which language to use for proper pronunciation and reading cadence.
     - For example, if you declare `lang="fr"`, a French-speaking screen reader will read the content in French.
   - **Visual Impairments**: Helps users with visual impairments understand the language context, improving their experience when using assistive technologies.

6. **SEO Considerations**:

   - **Search Engines**: The `lang` attribute helps search engines understand which language the content is in, so it can rank it properly for users in the appropriate language.
   - **Multilingual Websites**: On websites with multiple languages, the `lang` attribute helps search engines differentiate between versions of the site intended for different linguistic audiences.

7. **Best Practices**:
   - Always set the correct `lang` attribute to match the language of your content.
   - Use **specific regional dialects** if your content targets a particular region (e.g., `en-GB` for British English, `en-IN` for Indian English).
   - If the content is multilingual, use different `<html lang="...">` for each section or page and ensure that content within different languages is marked correctly.

---

#### **Example of Correct Use**:

```html
<!DOCTYPE html>
<html lang="en">
  <!-- Correct for English content -->
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to My Website</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>Welcome to my English-language website.</p>
  </body>
</html>
```

#### **Example of Incorrect Use** (Incorrect `lang`):

```html
<!DOCTYPE html>
<html lang="hi">
  <!-- Incorrect for English content -->
  <head>
    <meta charset="UTF-8" />
    <title>Welcome to My Website</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <!-- Content is in English -->
    <p>Welcome to my English-language website.</p>
    <!-- Content is in English -->
  </body>
</html>
```

---

By using the `lang` attribute properly, you can ensure **better accessibility**, **improved SEO**, and a **more consistent user experience** for visitors and search engines alike.

### **`rel` Attribute - Concise Notes**

The `rel` attribute defines the relationship between the current document and the linked resource. It’s used in `<a>`, `<link>`, `<area>`, and other HTML elements to provide additional context for web crawlers, browsers, and security measures.

#### **Common Values of `rel`:**

1. **`noopener`**:

   - **Purpose**: Prevents the new page from accessing the `window.opener` property, enhancing security when using `target="_blank"`.
   - **Use Case**: Open external links in new tabs without risk of malicious manipulation.
   - **Example**:
     ```html
     <a href="https://example.com" target="_blank" rel="noopener"
       >Visit Example</a
     >
     ```

2. **`noreferrer`**:

   - **Purpose**: Prevents sending the `Referer` header, which hides the referring URL from the linked site.
   - **Use Case**: Protect user privacy by not revealing the source page URL.
   - **Example**:
     ```html
     <a href="https://example.com" target="_blank" rel="noreferrer"
       >Visit Example</a
     >
     ```

3. **`nofollow`**:

   - **Purpose**: Tells search engines not to follow the link, preventing the passage of SEO value (link juice).
   - **Use Case**: Used for paid links, untrusted content, or preventing spammy links from affecting SEO.
   - **Example**:
     ```html
     <a href="https://example.com" rel="nofollow">Visit Example</a>
     ```

4. **`stylesheet`** (Used in `<link>`):

   - **Purpose**: Specifies that the linked resource is a stylesheet (CSS file).
   - **Example**:
     ```html
     <link rel="stylesheet" href="styles.css" />
     ```

5. **`icon`** (Used in `<link>`):

   - **Purpose**: Specifies a favicon for the website.
   - **Example**:
     ```html
     <link rel="icon" href="favicon.ico" type="image/x-icon" />
     ```

6. **`canonical`**:

   - **Purpose**: Indicates the preferred version of a page to search engines, useful for SEO and avoiding duplicate content issues.
   - **Example**:
     ```html
     <link rel="canonical" href="https://example.com/page1" />
     ```

7. **`alternate`**:

   - **Purpose**: Specifies an alternate version of the document, like a translated version.
   - **Example**:
     ```html
     <link rel="alternate" href="https://example.com/es" hreflang="es" />
     ```

8. **`prev` and `next`**:
   - **Purpose**: Used for paginated content to indicate the previous and next pages.
   - **Example**:
     ```html
     <link rel="prev" href="https://example.com/page1" />
     <link rel="next" href="https://example.com/page3" />
     ```

#### **Why Use `rel`?**

- **Security**: `noopener` and `noreferrer` help prevent malicious or privacy-invasive actions.
- **SEO**: `nofollow` prevents search engines from passing link equity to untrusted sites.
- **Efficiency**: Helps search engines understand the structure of your site (e.g., `canonical`, `prev`, `next`).

#### **Best Practices**:

- Always use `rel="noopener noreferrer"` when opening links in new tabs (`target="_blank"`).
- Use `rel="nofollow"` for untrusted, user-generated, or paid links.
- Use `rel="canonical"` to avoid duplicate content penalties.

---

### 4. **Links and Navigation**

#### 🔗 **Anchor Tags (`<a>`)**

- Used to create hyperlinks in HTML.
- Syntax:
  ```html
  <a href="URL">Link Text</a>
  ```
- Example:
  ```html
  <a href="https://example.com">Visit Site</a>
  ```

#### 📍 **Relative vs. Absolute URLs**

- **Relative URL**: Points to a location **within the same website**.
  - Example: `about.html` or `../images/logo.png`
  - Changes depending on current page location.
- **Absolute URL**: Full path, **includes protocol and domain**.
  - Example: `https://example.com/about.html`
  - Always points to the same location.

#### ✉️ **Email Links**

- Uses `mailto:` in the `href` attribute to open email clients.
- Example:
  ```html
  <a href="mailto:hello@example.com">Send Email</a>
  ```

#### 🎯 **Link Targets (`target` attribute)**

- Controls how the link opens:

  - `_self`: Opens in the **same tab** (default).
  - `_blank`: Opens in a **new tab**.
  - `_parent`: Opens in the **parent frame**.
  - `_top`: Opens in the **full body of the window** (breaks out of frames).

  Example:

  ```html
  <a href="https://example.com" target="_blank">Open in new tab</a>
  ```

---
