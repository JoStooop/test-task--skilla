import styles from './CallsTable.module.scss';
import { FC } from 'react';
import { useCallsTable } from '../model/useCallsTable';
import { TableHeader } from '@widgets/calls-table/ui/table-header/TableHeader.tsx';
import { TableBody } from '@widgets/calls-table/ui/table-body/TableBody.tsx';
import { TableHead } from '@widgets/calls-table/ui/table-head/TableHead.tsx';
import {headers} from "@features/calls-table/constants/headers.ts";

export const CallsTable: FC = () => {
  const { filteredCalls, setFilterType, setFilterDateRange, setSortBy, status, error } = useCallsTable();

  if (status === 'loading') return <div className='wrapper'>Загрузка...</div>;
  if (status === 'failed') return <div className='wrapper'>Ошибка: {error}</div>;

  return (
    <div className='wrapper'>
      <TableHeader onTypeChange={setFilterType} onDateChange={setFilterDateRange} />
      <table className={styles.table}>
        <TableHead headers={headers} onSort={setSortBy} />
        <TableBody calls={filteredCalls} />
      </table>
    </div>
  );
};
