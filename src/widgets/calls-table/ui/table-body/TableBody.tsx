import {FC} from 'react';
import {Call} from "@app/store/slices/callsSlice.ts";
import {TableRow} from "@shared/ui/table-row/TableRow.tsx";

interface TableBodyProps {
  calls: Call[];
}

export const TableBody: FC<TableBodyProps> = ({calls}) => {
  return (
    <tbody>
    {calls.map((call: Call) =>
      <TableRow key={call.id} call={call} />
    )}
    </tbody>
  );
};
