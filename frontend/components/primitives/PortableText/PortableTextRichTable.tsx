import type {
  RichTableCellType,
  RichTableType,
} from "sanity-plugin-rich-table";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

interface PortableTextRichTableProps {
  rows: RichTableType["rows"];
  columnHeaders?: RichTableType["columnHeaders"];
  hasColumnTitles?: RichTableType["hasColumnTitles"];
  hasRowTitles?: RichTableType["hasRowTitles"];
}

export const PortableTextRichTable = ({
  rows,
  columnHeaders,
  hasColumnTitles,
  hasRowTitles,
}: PortableTextRichTableProps) => {
  if (!rows || !columnHeaders) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {hasColumnTitles && (
            <tr className="min-w-35 border-alabaster border-b">
              {hasRowTitles && <th></th>}
              {columnHeaders?.map((header, index) => (
                <th
                  key={index}
                  className="type-mono-1440 pr-4 pb-6 text-left uppercase"
                >
                  {header.title}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="max-h-fit border-alabaster border-b last:border-b-0"
            >
              {hasRowTitles && <th>{row.title}</th>}
              {row.cells?.map((cell: RichTableCellType, cellIndex: number) => (
                <td
                  key={cellIndex}
                  className="min-w-35 py-6 pr-4 text-left align-top [&_:is(ul,ol)>li:last-child]:mb-0! [&_ol]:mb-0! [&_ul]:mb-0"
                >
                  <PortableText value={cell.content} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
