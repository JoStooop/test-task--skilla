import styles from './CallsTable.module.scss';
import { FC, useState } from 'react';
import { useCallsTable } from '../model/useCallsTable';
import { TableHeader } from '@widgets/calls-table/ui/table-header/TableHeader.tsx';
import { TableBody } from '@widgets/calls-table/ui/table-body/TableBody.tsx';
import { TableHead } from '@widgets/calls-table/ui/table-head/TableHead.tsx';
import { headers } from '@features/calls-table/constants/headers.ts';
import { OptionDate } from '@features/calls-table/types/tableOptionsTypes.ts';

export const CallsTable: FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<OptionDate>('Сегодня');
  const { filteredCalls, setFilterType, setFilterDateRange, setSortBy, status, error } = useCallsTable(selectedPeriod);

  const handlePeriodChange = (period: OptionDate) => {
    setSelectedPeriod(period);
  };

  if (status === 'loading') return <div className='wrapper'>Загрузка...</div>;
  if (status === 'failed') return <div className='wrapper'>Ошибка: {error}</div>;

  return (
    <div className='wrapper'>
      <TableHeader
        onTypeChange={setFilterType}
        onDateChange={(dateRange) => {
          setFilterDateRange(dateRange);
          setSelectedPeriod('Сегодня');
        }}
        onPeriodChange={handlePeriodChange}
      />
      <table className={styles.table}>
        <TableHead headers={headers} onSort={setSortBy} />
        <TableBody calls={filteredCalls} selectedPeriod={selectedPeriod} />
      </table>
    </div>
  );
};
