import type { TableRow } from "@/sanity.types";
import { cn } from "@/lib/utils";

type PortableTextTableProps = {
  className?: string;
  rows?: Array<
    {
      _key: string;
    } & TableRow
  >;
  mode?: "light" | "dark";
};

export const PortableTextTable = ({
  className,
  rows,
  mode = "light",
}: PortableTextTableProps) => {
  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return null;
  }

  const headerRow = rows[0];
  const dataRows = rows.slice(1);

  if (!headerRow?.cells || !Array.isArray(headerRow.cells)) {
    return null;
  }

  const headers = headerRow.cells;

  return (
    <div className={cn("mb-12 w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr
            className={cn(
              "border-b",
              mode === "light" ? "border-alabaster" : "border-gunmetal",
            )}
          >
            {headers.map((header: string, index: number) => (
              <th
                key={`${header}-${index}`}
                className="type-mono-1440 pb-6 text-left uppercase"
              >
                {typeof header === "string" ? header : String(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row: TableRow, rowIndex: number) => {
            if (!row?.cells || !Array.isArray(row.cells)) {
              return null;
            }

            return (
              <tr
                key={`row-${rowIndex}`}
                className={cn(
                  "border-b last:border-b-0",
                  mode === "light" ? "border-alabaster" : "border-gunmetal",
                )}
              >
                {row.cells.map((cell: string, index) => (
                  <td key={`${cell}-${index}`} className="type-body-1640 py-6">
                    {typeof cell === "string" ? cell : String(cell)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
