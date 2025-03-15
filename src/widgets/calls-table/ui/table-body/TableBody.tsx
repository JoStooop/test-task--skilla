import {FC} from 'react';
import {Call} from "@app/store/slices/callsSlice.ts";
import {TableRow} from "@shared/ui/table-row/TableRow.tsx";
import {CallGroupHeader} from "@shared/ui/call-group-header/CallGroupHeader.tsx";
import {getFormattedDate, getFormattedDates} from "@entities/call/utils/filterCalls.ts";

interface TableBodyProps {
  calls: Call[];
}

export const TableBody: FC<TableBodyProps> = ({calls}) => {

  const { today, yesterday } = getFormattedDates();

  const callsToday = calls.filter((call) => getFormattedDate(call.date) === today);
  const callsYesterday = calls.filter((call) => getFormattedDate(call.date) === yesterday);

  return (
    <tbody>
    {callsToday.length === 0 && callsYesterday.length === 0 && (
      <tr>
        <td>
          Нет данных о звонках
        </td>
      </tr>
    )}

    {callsToday.length > 0 && callsToday.map((call) => (
      <TableRow key={call.id} call={call} />
    ))}

    {callsYesterday.length > 0 && (
      <>
        <CallGroupHeader groupName='Вчера' callCount={callsYesterday.length} />
        {callsYesterday.map((call) => (
          <TableRow key={call.id} call={call} />
        ))}
      </>
    )}
    </tbody>
  );
};
