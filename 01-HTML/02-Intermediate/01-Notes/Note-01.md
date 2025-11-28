## 🔥 Advanced HTML Forms – Quick Notes

### 1. New Input Types

Give browsers context + built-in UI.

- `email` → must be valid email.
- `url` → must be valid URL.
- `number` → numeric input with min/max/step.
- `date`, `time`, `datetime-local` → pickers.
- `range` → slider.
- `color` → color picker.
- `tel`, `search` → optimized keyboards on mobile.

---

### 2. Validation Attributes

Built-in checks, no JS needed.

- `required` → field can’t be empty.
- `pattern` → regex rule.
- `min`, `max`, `step` → numeric/date limits.
- `maxlength`, `minlength` → text length control.

---

### 3. Datalist

Autocomplete suggestions.

```html
<input list="browsers" />
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
</datalist>
```

---

### 4. Fieldset & Legend

For grouping + accessibility.

```html
<fieldset>
  <legend>Personal Info</legend>
  <input type="text" name="name" />
</fieldset>
```

---

#### 🗝️ Core Idea

- **Input types** = better semantics & UI.
- **Validation** = safer forms without JS.
- **Datalist** = smart suggestions.
- **Fieldset/Legend** = structure + clarity.

---

## ⚡ Advanced Tables – Quick Revision

### 1. Table Sections

- `<thead>` → header rows (titles).
- `<tbody>` → main data.
- `<tfoot>` → summary/footer.

```html
<table>
  <thead>
    <tr>
      <th>Item</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Apple</td>
      <td>$5</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$5</td>
    </tr>
  </tfoot>
</table>
```

---

### 2. Column & Row Spanning

- `colspan="n"` → span across columns.
- `rowspan="n"` → span across rows.

```html
<tr>
  <th rowspan="2">Name</th>
  <th colspan="2">Scores</th>
</tr>
```

---

### 3. Caption

Table title, improves clarity + accessibility.

```html
<caption>
  Student Marks
</caption>
```

---

### 4. Accessibility

- `scope="col"` / `scope="row"` in `<th>`.
- `headers` attribute for complex tables.
- Always use `<caption>` for context.

```html
<th scope="col">Month</th>
<th scope="row">January</th>
```

---

#### 🗝️ Takeaway

- **thead/tbody/tfoot** = structure.
- **rowspan/colspan** = merge cells.
- **caption** = title.
- **scope/headers** = screen reader friendly.

---
