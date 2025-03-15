import styles from './DropdownType.module.scss';
import {FC, useState} from 'react';
import {ArrowMiniIcon} from "@shared/ui/icons/ArrowMiniIcon.tsx";
import {CloseIcon} from "@shared/ui/icons/CloseIcon.tsx";
import {OptionType} from "@features/calls-table/types/tableOptionsTypes.ts";

interface DropdownTypeProps {
  options: OptionType[];
  onTypeChange: (type: OptionType) => void;
}

export const DropdownType: FC<DropdownTypeProps> = ({options = [], onTypeChange}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<OptionType>(options[0]);

  const handleSelect = (type: OptionType) => {
    setSelectedType(type);
    onTypeChange(type);
    setIsOpen(false);
  };

  const handleReset = () => {
    const defaultType = options[0];
    setSelectedType(defaultType);
    onTypeChange(defaultType);
  };

  const showResetButton = ['Входящие', 'Исходящие'].includes(selectedType);

  return (
    <div className={styles.dropdown}>
      <button className={`${styles.toggle} ${showResetButton ? styles.toggle_active : ''}`}
              onClick={() => setIsOpen(!isOpen)}
      >
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


// import { Dropdown } from '@shared/ui/dropdown/Dropdown';
// import { OptionType } from "@features/calls-table/types/tableOptionsTypes.ts";
// import {FC} from "react";
//
// interface DropdownTypeProps {
//   options: OptionType[];
//   selectedType: OptionType;
//   onTypeChange: (type: OptionType) => void;
// }
//
// export const DropdownType: FC<DropdownTypeProps> = ({ options, selectedType, onTypeChange }) => {
//   const showReset = ['Входящие', 'Исходящие'].includes(selectedType);
//
//   const handleReset = () => {
//     onTypeChange(options[0]); // Сброс на "Все типы"
//   };
//
//   return (
//     <Dropdown
//       options={options}
//       selectedValue={selectedType}
//       onChange={onTypeChange}
//       showReset={showReset}
//       onReset={handleReset}
//       renderSelected={(value) => (
//         <span style={{ color: value === 'Входящие' || value === 'Исходящие' ? '#002CFB' : 'inherit' }}>
//           {value}
//         </span>
//       )}
//     />
//   );
// };
