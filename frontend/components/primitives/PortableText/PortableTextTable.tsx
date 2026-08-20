import { PortableText as PortableTextRenderer } from "@portabletext/react";
import { cn } from "cnfast";

type TableCell = {
  _key: string;
  _type: string;
  value: Parameters<typeof PortableTextRenderer>[0]["value"];
};

type TableRow = {
  _key: string;
  _type: string;
  cells: TableCell[];
};

type PortableTextTableProps = {
  headerRows?: number;
  rows?: TableRow[];
};

// @docs: https://www.sanity.io/docs/studio/portable-text-editor-configuration#tblh2
export const PortableTextTable = ({
  headerRows = 0,
  rows = [],
}: PortableTextTableProps) => {
  const headRows = rows.slice(0, headerRows);
  const bodyRows = rows.slice(headerRows);

  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full border-collapse text-left">
        {headRows.length > 0 && (
          <thead>
            {headRows.map((row) => (
              <tr key={row._key} className="border-platinum border-b">
                {row.cells.map((cell) => (
                  <th
                    key={cell._key}
                    scope="col"
                    className="type-body-1440 px-4 py-3 font-medium text-black"
                  >
                    {cell.value && <PortableTextRenderer value={cell.value} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr
              key={row._key}
              className={cn(
                "border-platinum border-b",
                rowIndex === bodyRows.length - 1 && "border-b-0",
              )}
            >
              {row.cells.map((cell) => (
                <td key={cell._key} className="type-body-1440 px-4 py-3">
                  {cell.value && <PortableTextRenderer value={cell.value} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
