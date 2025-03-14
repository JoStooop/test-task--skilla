import { FC, useState } from 'react';
import { ArrowMiniIcon } from '@shared/ui/icons/ArrowMiniIcon.tsx';
import styles from './TableHead.module.scss';

interface TableHeadProps {
  headers: { label: string; sortBy?: 'date' | 'duration' }[];
  onSort: (sortBy: 'date' | 'duration' | null) => void;
}

export const TableHead: FC<TableHeadProps> = ({ headers, onSort }) => {
  const [activeSort, setActiveSort] = useState<'date' | 'duration' | null>(null);

  const handleSort = (sortBy: 'date' | 'duration') => {
    if (activeSort === sortBy) {
      setActiveSort(null);
      onSort(null);
    } else {
      setActiveSort(sortBy);
      onSort(sortBy);
    }
  };

  return (
    <thead>
    <tr>
      {headers.map(({ label, sortBy }) => (
        <th key={label} className={styles.headerCell}>
          {sortBy ? (
            <button
              className={styles.sortButton}
              onClick={() => handleSort(sortBy)}
            >
              {label}
              <ArrowMiniIcon
                width={9}
                height={6}
                fill={activeSort === sortBy ? '#002CFB' : '#ADBFDF'}
                rotate={activeSort === sortBy ? 0 : 180}
                className={styles.arrowIcon}
              />
            </button>
          ) : (
            label
          )}
        </th>
      ))}
    </tr>
    </thead>
  );
};
