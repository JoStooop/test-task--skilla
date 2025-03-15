import {Call} from "@app/store/slices/callsSlice.ts";
import {OptionDate} from "@features/calls-table/types/tableOptionsTypes.ts";

const FilterType = {
  INCOMING: 'Входящие',
  OUTGOING: 'Исходящие',
} as const;


export const filterCallsByType = (call: Call, filterType: string): boolean => {
  if (filterType === FilterType.INCOMING && call.in_out !== 1) return false;
  if (filterType === FilterType.OUTGOING && call.in_out !== 0) return false;
  return true;
};

export const filterCallsByDateRange = (call: any, range: any) => {
  const callDate = new Date(call.date).toISOString().split('T')[0];
  return callDate >= range.startDate && callDate <= range.endDate;
};


export const convertSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getDateRange = (option: OptionDate) => {
  const today = new Date();
  const startDate = new Date(today);

  switch (option) {
    case 'Сегодня':
      return {
        startDate: today.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Неделя':
      startDate.setDate(today.getDate() - 6); // Последние 7 дней
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Месяц':
      startDate.setDate(today.getDate() - 29); // Последние 30 дней
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Год':
      startDate.setFullYear(today.getFullYear() - 1); // Последние 365 дней
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    default:
      throw new Error('Выберите из списка');
  }
};

export const getFormattedDate = (dateString: string) => {
  return new Date(dateString).toISOString().split('T')[0];
};

 export const getFormattedDates = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return {
    today: today.toISOString().split('T')[0],
    yesterday: yesterday.toISOString().split('T')[0],
  };
};
