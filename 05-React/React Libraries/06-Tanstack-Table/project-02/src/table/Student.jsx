import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { studentData as data } from "../data/MOCK_DATA";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
  }),
  columnHelper.accessor("name", {
    header: "Full Name",
    cell: (info) => <span>{info.getValue("name").toUpperCase()}</span>,
    footer: () => "name footer",
  }),
  columnHelper.accessor("email", { header: "Email Address" }),
  columnHelper.accessor("age", { header: "Age" }),

  columnHelper.display({
    id: "actions",
    cell: (info) => <button>button</button>,
  }),
];

const Student = () => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <h2>Application</h2>
      <table border={1}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <td key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Student;
