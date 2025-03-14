import styles from './DropdownDate.module.scss';
import {FC, useCallback, useState} from 'react';
import {ArrowMiniIcon} from '@shared/ui/icons/ArrowMiniIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CalendarIcon} from "@shared/ui/icons/CalendarIcon.tsx";

interface DropdownDateProps {
  options: string[];
  onDateChange: (date: string) => void;
}

export const DropdownDate: FC<DropdownDateProps> = ({options, onDateChange}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(options[0]);

  const handleSelect = useCallback((date: string) => {
    setSelectedDate(date);
    onDateChange(date);
    setIsOpen(false);
  }, [onDateChange]);

  return (
    <div className={styles.dropdown}>
      <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
        <ArrowMiniIcon
          width={9}
          height={6}
          fill="#ADBFDF"
          rotate={-90}
          className={styles.arrowIcon}
        />
        <CalendarIcon style={{marginRight: '8px'}} fill="#ADBFDF"/>
        <span className={styles.selected_date}>{selectedDate}</span>
        <ArrowMiniIcon
          width={9}
          height={6}
          fill="#ADBFDF"
          rotate={90}
          className={styles.arrowIcon}
        />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option: any) => (
            <li
              key={option}
              className={`${styles.item} ${selectedDate === option ? styles.active : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
          <li className={styles.datePickerItem}>
            <div className={`${styles.item} ${styles.item_date}`}>Указать даты</div>
            <div className={styles.datePickerContainer}>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                selectsStart
                startDate={startDate || undefined}
                endDate={endDate}
                placeholderText="__.__.__"
                dateFormat="dd.MM.yyyy"
                className={styles.datePickerInput}
              />
              <span>-</span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="__.__.__"
                dateFormat="dd.MM.yyyy"
                className={styles.datePickerInput}
              />
              <CalendarIcon/>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};
