import {OptionDate} from "@features/calls-table/types/tableOptionsTypes.ts";

export const getDateRange = (option: OptionDate) => {
  const today = new Date();
  const startDate = new Date(today);

  switch (option) {
    case 'Сегодня':
      startDate.setDate(today.getDate() - 1);
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Неделя':
      startDate.setDate(today.getDate() - 6); // Неделя
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Месяц':
      startDate.setDate(today.getDate() - 29); // Месяц
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Год':
      startDate.setFullYear(today.getFullYear() - 1); // Год
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

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 6);

  const lastMonth = new Date(today);
  lastMonth.setDate(today.getDate() - 29);

  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  return {
    today: today.toISOString().split('T')[0],
    yesterday: yesterday.toISOString().split('T')[0],
    lastWeek: {
      startDate: lastWeek.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    },
    lastMonth: {
      startDate: lastMonth.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    },
    lastYear: {
      startDate: lastYear.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
    },
  };
};
