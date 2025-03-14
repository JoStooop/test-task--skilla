import styles from './DropdownType.module.scss';
import {FC, useCallback, useState} from 'react';
import {ArrowMiniIcon} from "@shared/ui/icons/ArrowMiniIcon.tsx";
import {CloseIcon} from "@shared/ui/icons/CloseIcon.tsx";

interface DropdownTypeProps {
  onTypeChange: (type: string) => void;
  options: string[];
}

export const DropdownType: FC<DropdownTypeProps> = ({options = [], onTypeChange}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>(options[0]);

  const handleSelect = useCallback((type: string) => {
    setSelectedType(type);
    onTypeChange(type);
    setIsOpen(false);
  }, [onTypeChange]);

  const handleReset = useCallback(() => {
    const defaultType = options[0];
    setSelectedType(defaultType);
    onTypeChange(defaultType);
  }, [onTypeChange, options]);

  const showResetButton = selectedType === 'Входящие' || selectedType === 'Исходящие';

  return (
    <div className={styles.dropdown}>
      <button className={`${styles.toggle} ${showResetButton ? styles.toggle_active : ''}`}
              onClick={() => setIsOpen(!isOpen)}>
        {selectedType}
        <ArrowMiniIcon width={9} height={6} fill='#ADBFDF' rotate={isOpen ? 0 : 180}/>
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option}
                className={`${styles.item} ${selectedType === option ? styles.active : ''}`}
                onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {showResetButton && (
        <button className={styles.reset} onClick={handleReset}>
          Сбросить фильтры
          <CloseIcon/>
        </button>
      )}
    </div>
  );
};
