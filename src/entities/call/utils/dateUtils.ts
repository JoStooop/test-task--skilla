import {OptionDate} from "@features/calls-table/types/tableOptionsTypes.ts";

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
      startDate.setDate(today.getDate() - 6);
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Месяц':
      startDate.setDate(today.getDate() - 29);
      return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
      };
    case 'Год':
      startDate.setFullYear(today.getFullYear() - 1);
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
