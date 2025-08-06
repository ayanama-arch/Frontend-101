# HTML Accessibility (a11y) - Complete Guide

## Table of Contents

1. [ARIA Roles](#aria-roles)
2. [ARIA States and Properties](#aria-states-and-properties)
3. [Focus Management](#focus-management)
4. [Screen Reader Considerations](#screen-reader-considerations)
5. [manifest.json](#manifestjson)

---

## ARIA Roles

ARIA (Accessible Rich Internet Applications) roles define what an element is or does. They help assistive technologies understand the purpose of elements.

### Landmark Roles

```html
<!-- Main content area -->
<main role="main">
  <h1>Page Title</h1>
  <p>Main content goes here</p>
</main>

<!-- Navigation -->
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
  </ul>
</nav>

<!-- Complementary content -->
<aside role="complementary" aria-labelledby="sidebar-title">
  <h2 id="sidebar-title">Related Articles</h2>
  <ul>
    <li><a href="#article1">Article 1</a></li>
  </ul>
</aside>

<!-- Content information (footer) -->
<footer role="contentinfo">
  <p>&copy; 2024 Company Name</p>
</footer>

<!-- Banner (header) -->
<header role="banner">
  <h1>Site Title</h1>
</header>
```

### Widget Roles

```html
<!-- Button -->
<div
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="handleKeyDown(event)"
>
  Custom Button
</div>

<!-- Tab interface -->
<div role="tablist" aria-label="Settings">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    General
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Privacy
  </button>
</div>

<div role="tabpanel" id="panel1" aria-labelledby="tab1">
  <p>General settings content</p>
</div>

<div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>
  <p>Privacy settings content</p>
</div>

<!-- Slider -->
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-label="Volume"
  tabindex="0"
>
  <div class="slider-track">
    <div class="slider-thumb"></div>
  </div>
</div>

<!-- Menu -->
<ul role="menu" aria-labelledby="menu-button">
  <li role="menuitem"><a href="#save">Save</a></li>
  <li role="menuitem"><a href="#export">Export</a></li>
  <li role="separator"></li>
  <li role="menuitem"><a href="#quit">Quit</a></li>
</ul>
```

### Document Structure Roles

```html
<!-- Article -->
<article role="article">
  <header>
    <h1>Article Title</h1>
    <p>By Author Name</p>
  </header>
  <p>Article content...</p>
</article>

<!-- List -->
<div role="list">
  <div role="listitem">Item 1</div>
  <div role="listitem">Item 2</div>
  <div role="listitem">Item 3</div>
</div>

<!-- Table -->
<div role="table" aria-label="Student Grades">
  <div role="rowgroup">
    <div role="row">
      <div role="columnheader">Name</div>
      <div role="columnheader">Grade</div>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <div role="cell">John</div>
      <div role="cell">A</div>
    </div>
  </div>
</div>
```

---

## ARIA States and Properties

### States (Dynamic)

```html
<!-- aria-expanded (for collapsible content) -->
<button aria-expanded="false" aria-controls="menu" onclick="toggleMenu()">
  Menu
</button>
<ul id="menu" hidden>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<!-- aria-selected (for selectable items) -->
<ul role="listbox" aria-label="Color options">
  <li role="option" aria-selected="true">Red</li>
  <li role="option" aria-selected="false">Blue</li>
  <li role="option" aria-selected="false">Green</li>
</ul>

<!-- aria-checked (for checkboxes/radio buttons) -->
<div role="checkbox" aria-checked="false" tabindex="0" onclick="toggleCheck()">
  <span class="checkbox-icon"></span>
  Accept terms and conditions
</div>

<!-- aria-pressed (for toggle buttons) -->
<button aria-pressed="false" onclick="toggleBold()">
  <strong>B</strong> Bold
</button>

<!-- aria-disabled -->
<button aria-disabled="true" class="disabled">Submit (disabled)</button>

<!-- aria-hidden (hide decorative elements) -->
<button>
  <span aria-hidden="true">🔍</span>
  Search
</button>

<!-- aria-invalid (form validation) -->
<input type="email" aria-invalid="true" aria-describedby="email-error" />
<div id="email-error" role="alert">Please enter a valid email address</div>
```

### Properties (Static)

```html
<!-- aria-label (accessible name) -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby (reference to labeling element) -->
<h2 id="settings-title">Account Settings</h2>
<div role="group" aria-labelledby="settings-title">
  <input type="text" placeholder="Username" />
  <input type="email" placeholder="Email" />
</div>

<!-- aria-describedby (additional description) -->
<input type="password" aria-describedby="pwd-help" placeholder="Password" />
<div id="pwd-help">Password must be at least 8 characters long</div>

<!-- aria-required -->
<input type="text" aria-required="true" aria-label="Full name" />

<!-- aria-readonly -->
<input type="text" value="admin@example.com" aria-readonly="true" />

<!-- aria-controls (what this element controls) -->
<button aria-controls="sidebar" aria-expanded="false" onclick="toggleSidebar()">
  Toggle Sidebar
</button>
<div id="sidebar">Sidebar content</div>

<!-- aria-owns (owns other elements) -->
<input
  type="text"
  role="combobox"
  aria-owns="suggestions"
  aria-expanded="false"
/>
<ul id="suggestions" role="listbox">
  <li role="option">Suggestion 1</li>
  <li role="option">Suggestion 2</li>
</ul>

<!-- aria-live (live regions) -->
<div aria-live="polite" id="status"></div>
<div aria-live="assertive" id="errors"></div>

<!-- aria-atomic -->
<div aria-live="polite" aria-atomic="true" id="timer">
  Time remaining: 5 minutes
</div>
```

---

## Focus Management

### Keyboard Navigation

```html
<!-- Proper tabindex usage -->
<div class="modal" role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title" tabindex="-1">Modal Title</h2>
  <p>Modal content</p>
  <button tabindex="0">OK</button>
  <button tabindex="0">Cancel</button>
</div>

<!-- Skip links -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<a href="#navigation" class="skip-link">Skip to navigation</a>

<nav id="navigation">
  <!-- Navigation content -->
</nav>

<main id="main-content" tabindex="-1">
  <!-- Main content -->
</main>

<!-- Roving tabindex for component navigation -->
<div role="radiogroup" aria-labelledby="group-label">
  <span id="group-label">Choose an option:</span>
  <div role="radio" aria-checked="true" tabindex="0">Option 1</div>
  <div role="radio" aria-checked="false" tabindex="-1">Option 2</div>
  <div role="radio" aria-checked="false" tabindex="-1">Option 3</div>
</div>
```

### JavaScript Focus Management

```html
<script>
  // Focus trap for modals
  function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    element.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    });
  }

  // Focus management for SPAs
  function navigateTo(route) {
    // Update URL and content
    history.pushState({}, "", route);
    updateContent(route);

    // Focus management
    const mainHeading = document.querySelector("h1");
    if (mainHeading) {
      mainHeading.focus();
      mainHeading.scrollIntoView();
    }
  }

  // Keyboard event handling
  function handleKeyDown(event) {
    switch (event.key) {
      case "Enter":
      case " ": // Space
        event.preventDefault();
        handleClick();
        break;
      case "Escape":
        closeModal();
        break;
      case "ArrowDown":
        focusNext();
        break;
      case "ArrowUp":
        focusPrevious();
        break;
    }
  }
</script>

<!-- Focus indicators (CSS) -->
<style>
  .skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: #fff;
    padding: 8px;
    text-decoration: none;
    transition: top 0.3s;
  }

  .skip-link:focus {
    top: 6px;
  }

  /* Custom focus indicators */
  button:focus,
  input:focus,
  select:focus,
  textarea:focus {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
  }

  /* Focus indicators for custom components */
  [role="button"]:focus,
  [role="tab"]:focus,
  [role="menuitem"]:focus {
    outline: 2px solid #005fcc;
    outline-offset: 2px;
  }
</style>
```

---

## Screen Reader Considerations

### Semantic HTML

```html
<!-- Use proper heading structure -->
<h1>Main Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h3>Another Subsection</h3>
<h2>Another Section</h2>

<!-- Proper form labels -->
<form>
  <fieldset>
    <legend>Personal Information</legend>

    <label for="fname">First Name:</label>
    <input type="text" id="fname" required />

    <label for="lname">Last Name:</label>
    <input type="text" id="lname" required />
  </fieldset>

  <fieldset>
    <legend>Contact Preferences</legend>

    <input type="radio" id="email-pref" name="contact" value="email" />
    <label for="email-pref">Email</label>

    <input type="radio" id="phone-pref" name="contact" value="phone" />
    <label for="phone-pref">Phone</label>
  </fieldset>
</form>

<!-- Data tables with proper headers -->
<table>
  <caption>
    Monthly Sales Report
  </caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
      <td>5%</td>
    </tr>
    <tr>
      <th scope="row">February</th>
      <td>$12,000</td>
      <td>20%</td>
    </tr>
  </tbody>
</table>

<!-- Complex table with multiple header levels -->
<table>
  <caption>
    Quarterly Sales by Region
  </caption>
  <thead>
    <tr>
      <th rowspan="2" scope="col">Region</th>
      <th colspan="3" scope="colgroup">2024</th>
    </tr>
    <tr>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>$100k</td>
      <td>$120k</td>
      <td>$110k</td>
    </tr>
  </tbody>
</table>
```

### Screen Reader Specific Features

```html
<!-- Screen reader only content -->
<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
</style>

<button>
  <span aria-hidden="true">❤️</span>
  <span class="sr-only">Add to favorites</span>
</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true" id="search-results-summary">
  <!-- Announced when search completes -->
</div>

<div aria-live="assertive" id="form-errors">
  <!-- Important errors announced immediately -->
</div>

<!-- Progress indicators -->
<div
  role="progressbar"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="75"
  aria-label="File upload progress"
>
  <div class="progress-bar" style="width: 75%"></div>
  <span class="sr-only">75% complete</span>
</div>

<!-- Status updates -->
<div role="status" aria-live="polite" id="save-status">
  Document saved successfully
</div>

<!-- Alert messages -->
<div role="alert" id="error-message">
  Error: Please fill in all required fields
</div>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Laptops</li>
  </ol>
</nav>

<!-- Page structure with landmarks -->
<header role="banner">
  <nav role="navigation" aria-label="Main menu">
    <!-- Navigation items -->
  </nav>
</header>

<main role="main">
  <section aria-labelledby="news-heading">
    <h2 id="news-heading">Latest News</h2>
    <!-- News content -->
  </section>

  <section aria-labelledby="events-heading">
    <h2 id="events-heading">Upcoming Events</h2>
    <!-- Events content -->
  </section>
</main>

<aside role="complementary" aria-labelledby="sidebar-heading">
  <h2 id="sidebar-heading">Related Links</h2>
  <!-- Sidebar content -->
</aside>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

---

## manifest.json

The Web App Manifest provides metadata about your web application for accessibility and user experience.

### Basic Manifest Structure

```json
{
  "name": "My Accessible Web App",
  "short_name": "AccessApp",
  "description": "A fully accessible web application demo",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "lang": "en-US",
  "dir": "ltr",

  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],

  "screenshots": [
    {
      "src": "/screenshots/desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "Desktop view of the application"
    },
    {
      "src": "/screenshots/mobile.png",
      "sizes": "375x667",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "Mobile view of the application"
    }
  ],

  "categories": ["productivity", "utilities"],
  "iarc_rating_id": "e84b072d-71b3-4d3e-86ae-31a8ce4e53b7"
}
```

### Advanced Manifest Features

```json
{
  "name": "Advanced Accessibility App",
  "short_name": "A11yApp",
  "description": "Advanced accessible web application with PWA features",
  "start_url": "/?utm_source=pwa",
  "display": "standalone",
  "display_override": ["window-controls-overlay", "minimal-ui"],
  "orientation": "any",
  "theme_color": "#2196F3",
  "background_color": "#FAFAFA",
  "lang": "en-US",
  "dir": "ltr",

  "shortcuts": [
    {
      "name": "Create New Document",
      "short_name": "New Doc",
      "description": "Create a new document",
      "url": "/new-document",
      "icons": [
        {
          "src": "/icons/new-doc.png",
          "sizes": "192x192"
        }
      ]
    },
    {
      "name": "Settings",
      "short_name": "Settings",
      "description": "App settings and preferences",
      "url": "/settings",
      "icons": [
        {
          "src": "/icons/settings.png",
          "sizes": "192x192"
        }
      ]
    }
  ],

  "file_handlers": [
    {
      "action": "/open-file",
      "accept": {
        "text/plain": [".txt"],
        "text/markdown": [".md"],
        "application/json": [".json"]
      }
    }
  ],

  "protocol_handlers": [
    {
      "protocol": "web+a11y",
      "url": "/handle-protocol?url=%s"
    }
  ],

  "related_applications": [
    {
      "platform": "play",
      "url": "https://play.google.com/store/apps/details?id=com.example.app",
      "id": "com.example.app"
    }
  ],

  "prefer_related_applications": false,

  "scope": "/",
  "id": "a11y-web-app",

  "share_target": {
    "action": "/share-target",
    "method": "POST",
    "enctype": "multipart/form-data",
    "params": {
      "title": "title",
      "text": "text",
      "url": "url",
      "files": [
        {
          "name": "file",
          "accept": ["image/*", "text/plain"]
        }
      ]
    }
  }
}
```

### HTML Integration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json" />

    <!-- Fallback meta tags -->
    <meta name="application-name" content="My Accessible App" />
    <meta name="description" content="A fully accessible web application" />
    <meta name="theme-color" content="#000000" />
    <meta name="msapplication-TileColor" content="#000000" />

    <!-- iOS specific -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="AccessApp" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

    <!-- Icons for various platforms -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/icons/favicon-16x16.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/icons/favicon-32x32.png"
    />

    <title>My Accessible Web App</title>
  </head>
  <body>
    <!-- Your accessible content here -->
  </body>
</html>
```

### Service Worker Registration

```javascript
// Register service worker for PWA functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}

// Install prompt handling
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;

  // Show install button
  const installButton = document.getElementById("install-button");
  installButton.style.display = "block";

  installButton.addEventListener("click", (e) => {
    // Hide the app provided install promotion
    installButton.style.display = "none";
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
});
```

## Best Practices Summary

1. **Use semantic HTML first** - Always start with proper HTML elements before adding ARIA
2. **Test with screen readers** - Use NVDA, JAWS, or VoiceOver to test your implementation
3. **Maintain focus management** - Ensure keyboard users can navigate efficiently
4. **Provide multiple ways to access content** - Skip links, landmarks, headings
5. **Test without a mouse** - Ensure all functionality is keyboard accessible
6. **Use tools like axe-core** - Automated testing catches common issues
7. **Include real users** - Test with actual users who rely on assistive technology

Remember: Accessibility is not a checklist but an ongoing process of inclusive design!
