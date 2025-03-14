import { subWeeks, subMonths, subYears, isWithinInterval } from 'date-fns';
import {Call} from "@app/store/slices/callsSlice.ts";

const FilterType = {
  INCOMING: 'Входящие',
  OUTGOING: 'Исходящие',
} as const;

const FilterDate = {
  WEEK: 'Неделя',
  MONTH: 'Месяц',
  YEAR: 'Год',
} as const;

export const filterCallsByType = (call: Call, filterType: string): boolean => {
  if (filterType === FilterType.INCOMING && call.in_out !== 1) return false;
  if (filterType === FilterType.OUTGOING && call.in_out !== 0) return false;
  return true;
};

export const filterCallsByDate = (calls: Call[], filterDate: string): Call[] => {
  const now = new Date();
  let startDate: Date;

  switch (filterDate) {
    case FilterDate.WEEK:
      startDate = subWeeks(now, 1);
      break;
    case FilterDate.MONTH:
      startDate = subMonths(now, 1);
      break;
    case FilterDate.YEAR:
      startDate = subYears(now, 1);
      break;
    default:
      return calls;
  }

  return calls.filter((call: Call) => {
    const callDate = new Date(call.date);
    return isWithinInterval(callDate, { start: startDate, end: now });
  });
};


export const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
