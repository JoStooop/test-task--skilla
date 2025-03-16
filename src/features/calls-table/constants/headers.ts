import {Headers} from "@features/calls-table/types/tableTypes.ts";

export const headers: Headers[] = [
  { label: 'Тип' },
  { label: 'Время', sortBy: 'date' },
  { label: 'Сотрудник' },
  { label: 'Звонок' },
  { label: 'Источник' },
  { label: 'Оценка' },
  { label: 'Длительность', sortBy: 'duration' },
];
