import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { mockData } from "./MOCK_DATA";

//TData
type User = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
};

const data: User[] = mockData;

const columnHelper = createColumnHelper<User>();

const columns = [
  // Grouping column
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor("firstName", {
        header: "First Name",
        cell: (info) => info.getValue(),
        footer: (props) => <div> {props.column.id}</div>,
      }),
      // Accessor Column
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),

  // Grouping Column
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      // Accessor Column
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),

      // Grouping Column
      columnHelper.group({
        header: "More Info",
        columns: [
          // Accessor column
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          // Accessor Column
          columnHelper.accessor("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),

          // Accessor Column
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
  // Display Column
  columnHelper.display({
    id: "actions",
    header: "Visit Profile",
    cell: () => <button>Click Me!!</button>,
    footer: (props) => props.column.id,
  }),
];

const Employee = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (originalRow) => originalRow.id,
  });
  return (
    <>
      <h2>Hello</h2>

      <table border="1">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            console.log("HERE", table.getHeaderGroups());
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // console.log("HERE: ", header);
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
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
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};

export default Employee;
