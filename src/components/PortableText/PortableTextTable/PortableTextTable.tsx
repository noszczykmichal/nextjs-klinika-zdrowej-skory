import { PortableTextComponentProps } from "next-sanity";

interface TableRow {
  _key: string;
  _type: "row";
  cells: string[];
}

interface TableWithCaptionValue {
  _type: "tableWithCaption";
  _key: string;
  caption?: string;
  table: {
    rows: TableRow[];
  };
}

export default function PortableTextTable({
  value,
}: PortableTextComponentProps<TableWithCaptionValue>) {
  return (
    <div className="mb-8 w-full overflow-x-auto">
      <table className="w-full min-w-125 table-fixed border-collapse overflow-hidden rounded-md">
        {value.caption && (
          <caption className="text-golden-100 mb-2 text-left font-semibold">
            {value.caption}
          </caption>
        )}
        <colgroup>
          <col className="w-27.5" />
          <col className="w-37.5 xl:w-67.5" />
          <col className="w-auto" />
        </colgroup>
        <tbody>
          {value.table.rows.map((row, i) => (
            <tr
              key={row._key}
              className={
                i === 0
                  ? "bg-blue-100 text-white"
                  : i % 2 === 0
                    ? "bg-gray-50"
                    : "bg-white"
              }
            >
              {row.cells.map((cell: string, j: number) => {
                const Tag = i === 0 ? "th" : "td";
                return (
                  <Tag key={j} className="border px-3 py-2 text-left">
                    {cell}
                  </Tag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
