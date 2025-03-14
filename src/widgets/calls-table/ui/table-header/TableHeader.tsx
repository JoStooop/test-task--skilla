import styles from './TableHeader.module.scss'
import {FC} from "react";
import {DropdownType} from '@shared/ui/dropdown-type/DropdownType.tsx';
import {DropdownDate} from '@shared/ui/dropdown-date/DropdownDate.tsx';

interface TableHeaderProps {
  onTypeChange: (type: string) => void;
  onDateChange: (date: string) => void;
}

const optionsType = ['Все типы', 'Входящие', 'Исходящие']
const optionsDate = ['Сегодня', 'Неделя', 'Месяц', 'Год'];

export const TableHeader: FC<TableHeaderProps> = ({onTypeChange, onDateChange}) => {
  return (
    <div className={styles.header}>
      <DropdownType options={optionsType} onTypeChange={onTypeChange}/>
      <DropdownDate options={optionsDate} onDateChange={onDateChange}/>
    </div>
  );
};
