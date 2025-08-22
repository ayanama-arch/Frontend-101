# Table

## Table Instance

`useReactTable` returns an instance which has all the methods and properties to interact with table data and UI.

To create a table 3 options are required: `columns`, `data`, and `getCoreRowModel`.

- When creating row in table `getCoreRowModel` it's 1:1 mapping of the original data passed in table

```jsx
const table = useReactTAble({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
});
```

## Row Models

Row models run under hood to transform original data as we want to render.

```jsx
table.getRowModel().rows; // Array of Rows
table.getRowModel().rowsById["row-id"]; // Object of rows where each row is keyed by it's id
```

## Rows

`table.getRow(id)`: It will give a row object of id

`Row Models`: Row objects are stored in an array of object called row model.

```jsx
<tbody>
  {table.getRowModel().rows.map((row) => (
    <tr key={row.id}>{/*...*/}</tr>
  ))}
</tbody>
```

`Selected Rows`

```jsx
const selectedRows = table.getSelectedRowModel().rows;
```

`Row IDs`: Every row object has an id property by default which is equal to the index of row.

If you want to use custom id or on inside row you can `getRowId`

```jsx
const table = useReactTable({
  columns,
  data,
  getCoreRowModel: getCoreRowModel(),
  getRowId: (originalRow) => originalRow.id,
});
```

`Accessing Row Values`

```jsx
const firstName = row.getValue("firstName"); // read the row value from firstName column
const lastName = row.renderValue("lastName"); // render the value from the lastName column
```

`Accessing Original Data`

```jsx
const firstName = row.original.firstName;
```

## Cell Guide

You can use `row.getAllCells` or `row.getVisibleCells` to get appropriate cells.

`Cell Ids`: Every cell object has id property which is constructed simply union ofparent row and colund id with underscore

```jsx
{id:`${row.id}_${column.id}}
```

Every cell has reference of its' parent row and column

`Access Cell Values`

Recommended approach is use `cell.getValue` or `cell.renderValue`

```jsx
const firstName = cell.getValue("firstName"); // read the cell value from the firstName
const firstName = cell.renderValue("firstName"); // read the cell value from the firstName
```

`flexRender`: If you use getValue or renderValue it will grab the value from accessor function but if you passed cell=>JSX then you need to use `flexRender`

`Rendering Table`

```jsx
<tbody>
  {table.getRowModel().rows.map((row) => {
    console.log(row.id);
    return (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <td key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    );
  })}
</tbody>
```

## Header Groups

Header groups are row of headers of you are grouping columns there can be multiple row of headers.
`table.getHeaderGroups` or `table.get[Left|Center|Right]HeaderGroups`

```jsx
<thead>
  {table.getHeaderGroups().map((headerGroup) => {
    return (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map(
          (
            header // map over the headerGroup headers array
          ) => (
            <th key={header.id} colSpan={header.colSpan}>
              {/* */}
            </th>
          )
        )}
      </tr>
    );
  })}
</thead>
```

## Headers

Headers comes from header groups and rendered in `<thead>` section.

`headerGroup.headers` array of headers.

### Nested Grouped Headers properties

`colspan`: number of columns header should span.
`rowSpan`: number of rows header should span.
`isPlaceholder`: A boolean flag if header is placeholder header.

## Columns
