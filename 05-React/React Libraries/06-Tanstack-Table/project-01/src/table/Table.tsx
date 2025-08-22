import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import RowAction from "./RowAction";

// Provided code (replace with actual imports if different)
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

const defaultColumns = [
  // Display Column
  columnHelper.display({
    id: "actions",
    cell: (props) => <RowAction row={props.row} />,
  }),
  // Grouping Column (Name)
  columnHelper.group({
    header: "Name",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  // Grouping Column (Info)
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("age", {
        header: () => "Age",
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("visits", {
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            header: "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("progress", {
            header: "Profile Progress",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

// Assuming you have sample data
const data: Person[] = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    visits: 5,
    status: "Active",
    progress: 80,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    age: 25,
    visits: 10,
    status: "Active",
    progress: 90,
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    age: 40,
    visits: 15,
    status: "Inactive",
    progress: 70,
  },
  {
    firstName: "Emily",
    lastName: "Williams",
    age: 35,
    visits: 8,
    status: "Active",
    progress: 85,
  },
  {
    firstName: "David",
    lastName: "Brown",
    age: 28,
    visits: 12,
    status: "Active",
    progress: 95,
  },
  {
    firstName: "Sarah",
    lastName: "Jones",
    age: 33,
    visits: 20,
    status: "Inactive",
    progress: 60,
  },
  {
    firstName: "James",
    lastName: "Davis",
    age: 45,
    visits: 4,
    status: "Active",
    progress: 75,
  },
  {
    firstName: "Jennifer",
    lastName: "Miller",
    age: 29,
    visits: 18,
    status: "Active",
    progress: 88,
  },
  {
    firstName: "Robert",
    lastName: "Wilson",
    age: 32,
    visits: 6,
    status: "Inactive",
    progress: 65,
  },
  {
    firstName: "Laura",
    lastName: "Martinez",
    age: 37,
    visits: 14,
    status: "Active",
    progress: 92,
  },
];

const Table = () => {
  const table = useReactTable({
    columns: defaultColumns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

//   table.

  return (
    <div className="table-container">
      {" "}
      {/* Add a CSS class for styling (optional) */}
      <table>
        <thead key="header"> {/* Add a unique key for the header */}
          {table.getHeaderGroups().map((row) => (
            <tr key={row.id}>
              {row.headers.map((cell) => (
                <th key={cell.id}>{cell.getValue()}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getCells().map((cell) => (
                <td key={cell.id}>{cell.getValue()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>>
      </table>
    </div>
  );
};

export default Table;
