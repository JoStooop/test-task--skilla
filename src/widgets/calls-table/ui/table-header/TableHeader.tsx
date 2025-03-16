import styles from './TableHeader.module.scss';
import { FC } from 'react';
import { DropdownType } from '@shared/ui/dropdown-type/DropdownType.tsx';
import { DropdownDate } from '@shared/ui/dropdown-date/DropdownDate.tsx';
import { optionsType, optionsDate } from '@features/calls-table/constants/tableOptions.ts';
import { DateRange, OptionType, OptionDate } from '@features/calls-table/types/tableOptionsTypes.ts';

interface TableHeaderProps {
  onTypeChange: (type: OptionType) => void;
  onDateChange: (date: DateRange) => void;
  onPeriodChange: (period: OptionDate) => void;
}

export const TableHeader: FC<TableHeaderProps> = ({ onTypeChange, onDateChange, onPeriodChange }) => {
  return (
    <div className={styles.header}>
      <DropdownType options={optionsType} onTypeChange={onTypeChange} />
      <DropdownDate options={optionsDate} onDateChange={onDateChange} onPeriodChange={onPeriodChange} />
    </div>
  );
};
