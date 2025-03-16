import { FC } from 'react';
import { Call } from '@app/store/slices/callsSlice.ts';
import { getFormattedDate, getFormattedDates, getDateRange } from '@entities/call/utils/dateUtils.ts';
import { OptionDate } from '@features/calls-table/types/tableOptionsTypes.ts';
import {CallGroup} from "@shared/ui/call-group/CallGroup.tsx";

interface TableBodyProps {
  calls: Call[];
  selectedPeriod?: OptionDate;
}

export const TableBody: FC<TableBodyProps> = ({ calls, selectedPeriod = 'Сегодня' }) => {
  const { today, yesterday } = getFormattedDates();

  const callsToday = selectedPeriod === 'Сегодня'
    ? calls.filter((call) => getFormattedDate(call.date) === today) : [];
  const callsYesterday = selectedPeriod === 'Сегодня'
    ? calls.filter((call) => getFormattedDate(call.date) === yesterday) : [];

  const { startDate, endDate } = getDateRange(selectedPeriod);
  const filteredCalls = selectedPeriod !== 'Сегодня'
    ? calls.filter((call) => {
      const callDate = getFormattedDate(call.date);
      return callDate >= startDate && callDate <= endDate;
    })
    : [];

  return (
    <tbody>
    {calls.length === 0 && (
      <tr>
        <td colSpan={7} style={{ textAlign: 'center' }}>
          Нет данных о звонках
        </td>
      </tr>
    )}

    {selectedPeriod === 'Сегодня' && (
      <>
        {callsToday.length > 0 && (
          <CallGroup calls={callsToday} />
        )}

        {callsYesterday.length > 0 && (
          <CallGroup groupName="Вчера" calls={callsYesterday} />
        )}
      </>
    )}

    {selectedPeriod !== 'Сегодня' && (
      <CallGroup groupName={selectedPeriod} calls={filteredCalls} />
    )}
    </tbody>
  );
};
