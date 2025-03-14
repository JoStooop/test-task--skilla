import styles from './CallsTable.module.scss';
import { FC } from 'react';
import { useCallsTable } from '../model/useCallsTable';
import { TableHeader } from '@widgets/calls-table/ui/table-header/TableHeader.tsx';
import { TableBody } from '@widgets/calls-table/ui/table-body/TableBody.tsx';
import { TableHead } from '@widgets/calls-table/ui/table-head/TableHead.tsx';

const headers: { label: string; sortBy?: 'date' | 'duration' }[] = [
  { label: 'Тип' },
  { label: 'Время', sortBy: 'date' },
  { label: 'Сотрудник' },
  { label: 'Звонок' },
  { label: 'Источник' },
  { label: 'Оценка' },
  { label: 'Длительность', sortBy: 'duration' },
];

export const CallsTable: FC = () => {
  const { filteredCalls, setFilterType, setFilterDate, setSortBy, status, error } = useCallsTable();

  if (status === 'loading') return <div className='wrapper'>Загрузка...</div>;
  if (status === 'failed') return <div className='wrapper'>Ошибка: {error}</div>;

  return (
    <div className='wrapper'>
      <TableHeader onTypeChange={setFilterType} onDateChange={setFilterDate} />
      <table className={styles.table}>
        <TableHead headers={headers} onSort={setSortBy} />
        <TableBody calls={filteredCalls} />
      </table>
    </div>
  );
};
