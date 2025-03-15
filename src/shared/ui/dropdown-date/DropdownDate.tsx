import styles from './DropdownDate.module.scss';
import {FC, useCallback, useState} from 'react';
import {ArrowMiniIcon} from '@shared/ui/icons/ArrowMiniIcon';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CalendarIcon} from "@shared/ui/icons/CalendarIcon.tsx";
import {DateRange, OptionDate} from "@features/calls-table/types/tableOptionsTypes.ts";
import {getDateRange} from "@entities/call/utils/dateUtils.ts";

interface DropdownDateProps {
  options: OptionDate[];
  onDateChange: (date: DateRange) => void;
}

export const DropdownDate: FC<DropdownDateProps> = ({options, onDateChange}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<OptionDate>(options[0]);

  const handleSelect = useCallback((option: OptionDate) => {
    setSelectedDate(option);
    const range = getDateRange(option);
    onDateChange(range);
    setIsOpen(false);
  }, [onDateChange]);

    return (
      <div className={styles.dropdown}>
        <button>
          <ArrowMiniIcon
            width={9}
            height={6}
            fill={styles.arrowIcon}
            rotate={-90}
            className={styles.arrowIcon}
          />
        </button>
        <button className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
          <CalendarIcon className={styles.calendarDate} fill={styles.calendarDate}/>
          <span className={styles.selected_date}>{selectedDate}</span>
        </button>
        <ArrowMiniIcon
          width={9}
          height={6}
          fill={styles.arrowIcon}
          rotate={90}
          className={styles.arrowIcon}
        />

        {isOpen && (
          <ul className={styles.menu}>
            {options.map((option: OptionDate) => (
              <li
                key={option}
                className={`${styles.item} ${selectedDate === option ? styles.active : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
            <div className={styles.datePickerItem}>
              <div className={styles.date_title}>Указать даты</div>
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
            </div>
          </ul>
        )}
      </div>
    );
  };
