import { ReactNode } from "react";

type Column<T> = {
  key: keyof T | "actions";
  title: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: Column<T>[];
  rows: T[];
};

export function DataTable<T extends { id: number }>({
  columns,
  rows,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-semibold"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}

          {rows.map((row) => (
            <tr key={row.id} className="border-b last:border-b-0">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3">
                  {column.render
                    ? column.render(row)
                    : String(row[column.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
