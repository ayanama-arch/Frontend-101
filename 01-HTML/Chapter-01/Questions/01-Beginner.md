**1. HTML Basics**

1.  **What does HTML stand for?** HyperText Markup Language.
2.  **Can you briefly explain the purpose of HTML in web development?** It provides the structural foundation and content of a webpage, defining elements like text, images, links, and forms.
3.  **Describe the basic structure of a standard HTML document.** It starts with the `<!DOCTYPE html>` declaration, followed by the `<html>` root element, which contains the `<head>` for metadata and the `<body>` for the visible content.
4.  **What is the role of the `<!DOCTYPE html>` declaration? Where should it be placed in an HTML document?** It informs the browser about the HTML version being used. It should be the very first thing in the HTML document.
5.  **What are the three main root-level elements in every HTML page?** `<html>`, `<head>`, and `<body>`.
6.  **What is the purpose of the `<head>` element? What kind of information typically goes inside it?** It contains metadata about the HTML document, such as the page title (`<title>`), character set (`<meta charset>`), links to stylesheets (`<link>`), and scripts (`<script>`). This information is not directly displayed on the page.
7.  **What is the purpose of the `<body>` element? Where does the visible content of a webpage reside?** The `<body>` element contains all the content that is visible to the user on the webpage, such as text, images, links, and other elements.

**2. Text Fundamentals**

8.  **What HTML elements are used to define headings? How many levels of headings are there?** The `<h1>` to `<h6>` elements are used for headings. There are six levels, with `<h1>` being the most important and `<h6>` the least.
9.  **How do you create a paragraph in HTML? Which element is used?** The `<p>` element is used to create a paragraph.
10. **What are the HTML elements used to make text bold and italic, respectively?** `<strong>` is used for strong emphasis (often displayed as bold), and `<em>` is used for emphasis (often displayed as italic).
11. **Are there other HTML elements for text formatting besides bold and italic? Can you name a couple?** Yes, for example: `<ins>` for inserted text (often underlined), `<del>` for deleted text (often strikethrough), `<sub>` for subscript, and `<sup>` for superscript.
12. **How do you add comments to your HTML code? Why are comments useful?** Comments are added using \`\` to end. They are useful for explaining code, leaving notes for other developers (or yourself), and temporarily excluding sections of code from being displayed.

**3. HTML Elements**

13. **What is the fundamental difference between a block-level element and an inline element? Can you give an example of each?** Block-level elements typically start on a new line and take up the full width available. Examples include `<div>`, `<p>`, `<h1>`-`<h6>`, and `<ul>`/`<ol>`. Inline elements typically flow within the surrounding text and only take up the width necessary for their content. Examples include `<span>`, `<a>`, `<img>`, and `<strong>`/`<em>`.
14. **What is the purpose of the `<div>` element? Is it a block-level or inline element?** The `<div>` element is a generic container for flow content. It is a block-level element and is often used for structuring and styling sections of a webpage.
15. **What is the purpose of the `<span>` element? Is it a block-level or inline element?** The `<span>` element is a generic inline container for phrasing content. It is often used to style specific parts of text within a block-level element.
16. **How do you insert a line break within a paragraph? Which element is used?** The `<br>` element (line break) is used to insert a line break. It is a self-closing tag.
17. **How do you create a horizontal line across the page? Which element is used?** The `<hr>` element (horizontal rule) is used to create a thematic break or a horizontal line. It is also a self-closing tag.

**4. Links and Navigation**

18. **Which HTML element is used to create a hyperlink? What is its primary attribute?** The `<a>` (anchor) element is used to create a hyperlink. Its primary attribute is `href`, which specifies the destination URL.
19. **Explain the difference between a relative URL and an absolute URL. When would you use each?** An absolute URL specifies the full address of a resource, including the protocol (e.g., `https://www.example.com/page.html`). A relative URL specifies the path to a resource relative to the current HTML document's location (e.g., `images/logo.png` or `/about`). Relative URLs are typically used for linking to other pages or assets within the same website, while absolute URLs are used for linking to external websites.
20. **How do you create a link that opens in a new browser tab or window? Which attribute is used?** You use the `target` attribute with the value `_blank`. For example: `<a href="https://www.example.com" target="_blank">Visit Example</a>`.
21. **How can you create a link that sends an email when clicked? What is the syntax?** You use the `mailto:` scheme in the `href` attribute, followed by the email address. For example: `<a href="mailto:info@example.com">Email Us</a>`. You can also include a subject and body: `<a href="mailto:info@example.com?subject=Website Inquiry&body=Hello, I have a question...">Email Us</a>`.
22. **What is the purpose of the `target` attribute in an anchor tag? List some of its common values.** The `target` attribute specifies where to open the linked document. Common values include:
    - `_blank`: Opens the link in a new window or tab.
    - `_self`: Opens the link in the same frame as it was clicked (default).
    - `_parent`: Opens the link in the parent frame.
    - `_top`: Opens the link in the full body of the window.
    - `framename`: Opens the link in a named iframe.

**5. Lists**

23. **How do you create an ordered list in HTML? What is the default numbering style?** You use the `<ol>` (ordered list) element, with list items defined by `<li>` elements within it. The default numbering style is Arabic numerals (1, 2, 3...).

24. **How do you create an unordered list in HTML? What is the default bullet style?** You use the `<ul>` (unordered list) element, with list items defined by `<li>` elements within it. The default bullet style is a disc.

25. **How do you create a definition list in HTML? What are the elements used within it?** You use the `<dl>` (definition list) element. Within it, you use `<dt>` (definition term) to define a term and `<dd>` (definition description) to describe the term.

26. **Can you create a list within another list? If so, what is this called? Provide a basic example structure.** Yes, this is called a nested list.

    ```html
    <ul>
      <li>Item 1</li>
      <li>
        Item 2
        <ol>
          <li>Sub-item 2.1</li>
          <li>Sub-item 2.2</li>
        </ol>
      </li>
      <li>Item 3</li>
    </ul>
    ```

**6. Images**

27. **Which HTML element is used to embed an image? What are its two essential attributes?** The `<img>` element is used. Its two essential attributes are `src` (specifies the path to the image) and `alt` (provides alternative text for the image).
28. **What is the purpose of the `alt` attribute for an image? Why is it important?** The `alt` attribute provides alternative text for an image if it cannot be displayed (e.g., due to a broken link or if the user is using a screen reader). It is crucial for accessibility and SEO.
29. **How can you specify the width and height of an image in HTML? Which attributes are used?** You can use the `width` and `height` attributes within the `<img>` tag. It's generally recommended to use CSS for styling, but these attributes can still be used to help prevent layout shifts.
30. **Name a few common image file formats that are supported by web browsers.** JPEG (.jpg or .jpeg), PNG (.png), GIF (.gif), SVG (.svg), and WebP (.webp).

**7. Basic Tables**

31. **What is the main HTML element used to define a table?** The `<table>` element.

32. **What elements are used to define table rows, table headers, and table data cells?**

    - `<tr>`: Table Row
    - `<th>`: Table Header Cell
    - `<td>`: Table Data Cell

33. **How do you create a header cell in a table? How does it typically differ visually from a data cell?** You use the `<th>` element. Browsers typically render header cells with bold text and centered alignment by default.

34. **What is the basic structure of a simple HTML table with a header row and some data rows?**

    ```html
    <table>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
      <tr>
        <td>Data 1</td>
        <td>Data 2</td>
      </tr>
      <tr>
        <td>Data 3</td>
        <td>Data 4</td>
      </tr>
    </table>
    ```

**8. Simple Forms**

35. **Which HTML element is used to create a form?** The `<form>` element.
36. **What is the purpose of the `action` attribute in a `<form>` tag?** It specifies the URL where the form data should be sent when the form is submitted.
37. **What is the purpose of the `method` attribute in a `<form>` tag? What are the two common values?** It specifies the HTTP method used to send the form data to the server. The two common values are `get` (data is appended to the URL) and `post` (data is sent in the request body).
38. **Name a few basic input types that can be created using the `<input>` element.** `text`, `password`, `radio`, `checkbox`, `submit`, `reset`, `email`, `number`, `date`.
39. **How do you associate a text label with an input field? Which element is used?** You use the `<label>` element and associate it with the input field using either the `for` attribute on the `<label>` matching the `id` of the input, or by placing the input element directly inside the `<label>` tag.
40. **How do you create a submit button in a form? Which input type is used?** You can use `<input type="submit">` or the `<button type="submit">` element.
41. **What is the purpose of the `name` attribute in form elements?** The `name` attribute is crucial for identifying form elements when the form data is submitted to the server. The server uses these names to access the submitted values.

**General Beginner Concepts**

42. **What are HTML attributes? How are they added to HTML elements?** Attributes provide additional information about HTML elements. They are added within the opening tag of an element, consisting of a name and a value separated by an equals sign (e.g., `<img src="image.jpg" alt="My Image">`).
43. **Can an HTML element have multiple attributes?** Yes, an HTML element can have multiple attributes, separated by spaces.
44. **Are HTML tags case-sensitive? What is the convention for writing them?** No, HTML tags are not case-sensitive in most modern browsers. However, the convention is to write them in lowercase for consistency and better readability.
45. **What happens if you have improperly nested HTML elements?** Improper nesting can lead to unpredictable rendering and behavior of the webpage. It's important to ensure that elements are closed in the correct order (the last opened element should be the first closed).
46. **What are self-closing tags in HTML? Can you give an example?** Self-closing tags are elements that do not require a separate closing tag. In HTML5, most of these can be written without the trailing slash, although it's still valid. Examples include `<br>`, `<hr>`, and `<img>`. Older versions of HTML (XHTML) required the trailing slash (e.g., `<br />`).
47. **How does a web browser interpret and display HTML code?** The browser parses the HTML code, creating a Document Object Model (DOM). The DOM represents the structure of the document as a tree of objects. The browser then uses the DOM along with CSS to render the visual representation of the webpage.
48. **What is the Document Object Model (DOM) in the context of HTML?** The DOM is a programming interface for HTML and XML documents. It represents the page structure as a tree of nodes, allowing programs to dynamically access and update the content, structure, and style of a webpage.
49. **Why is it important to write well-structured and semantic HTML?** Well-structured and semantic HTML improves accessibility (especially for users with assistive technologies), SEO (search engines can better understand the content), maintainability (code is easier to read and understand), and overall code quality. Semantic HTML uses elements that accurately describe the meaning of the content (e.g., `<article>`, `<nav>`, `<footer>`).
50. **As a web developer with some experience, how do you see a solid understanding of basic HTML contributing to your overall skillset?** A strong foundation in HTML is crucial because it forms the backbone of every webpage. Without it, it's difficult to effectively structure content, implement layouts with CSS, or add dynamic behavior with JavaScript. Understanding the nuances of HTML, including semantic elements and accessibility best practices, leads to better, more maintainable, and user-friendly web applications. It also provides a solid base for learning more advanced front-end technologies and frameworks.
