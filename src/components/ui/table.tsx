import clsx from "clsx";
import { useMemo } from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Client } from "../../services/types";
interface Props {
  Clients: Client[];
  query: string;
}
export const Table = ({ Clients, query }: Props) => {
  //Filtered Items based on query Term
  const filteredItems = useMemo(
    () =>
      Clients?.filter((item) => {
        if (query.length === 0) {
          return item;
        } else if (
          item.pc_name?.toLowerCase().includes(query?.toLowerCase()) ||
          item.ip_address.includes(query?.toLowerCase())
        ) {
          return item;
        }
      }),
    [query, Clients]
  );
  if (filteredItems.length === 0)
    return (
      <div className="h-full text-center text-2xl dark:text-dark-text-base ">
        Keine Ergebnisse zur Suche
      </div>
    );

  return (
    <div className="mb-10  h-96 w-full cursor-pointer overflow-y-auto rounded-lg border border-gray-700 shadow-md dark:bg-dark-secondary">
      <table className="w-full border-collapse bg-light-primary text-left text-sm  dark:bg-dark-secondary">
        <thead className="sticky top-0  bg-gray-50 text-lg font-bold dark:bg-dark-secondary dark:text-dark-text-hover">
          <th scope="col" className="px-6 py-4 font-medium">
            Name
          </th>
          <th scope="col" className="px-6 py-4 font-medium">
            IP Adresse
          </th>
          <th scope="col" className="px-6 py-4 font-medium">
            Austellungs Client
          </th>
          <th scope="col" className="px-6 py-4 font-medium">
            Anzahl Videos
          </th>
          <th scope="col" className="px-6 py-4 font-medium">
            {" "}
          </th>
        </thead>
        <tbody className="divide-y divide-gray-900 border-t border-gray-700 text-lg dark:text-dark-text-hover">
          {filteredItems.map((client) => (
            <tr
              key={client.id}
              className="hover:bg-gray-50 hover:dark:bg-gray-800"
            >
              <th className="flex gap-3 px-6 py-4 font-normal ">
                <div className="font-medium ">{client.pc_name} </div>
              </th>

              <td className="px-6 py-4">{client.ip_address}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center  gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-gray-900">
                  <span
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full ",
                      client.is_expo_client ? "bg-green-600" : "bg-red-400"
                    )}
                  ></span>
                  {client.is_expo_client ? "Ja" : "Nein"}
                </span>
              </td>
              <td className="px-6 py-4">{} </td>

              <td className="px-6 py-4 dark:text-dark-text-base ">
                <div className="flex justify-end gap-4">
                  <BiTrash
                    size="1.5em"
                    className="dark:hover:text-dark-text-hover"
                  />
                  <BiEdit
                    size="1.5em"
                    className="dark:hover:text-dark-text-hover"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const style = {
  borderCollapse: "collapse",
} as const;

const RTable = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table style={style}>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
};

export default RTable;
type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? 100, // 100 is our default value if width is not defined
      borderBottom: "2px solid black",
    };

    return (
      <th key={`headCell-${index}`} style={style}>
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};
type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
          return <td key={`cell-${index2}`}>{!row[column.key]}</td>;
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};
