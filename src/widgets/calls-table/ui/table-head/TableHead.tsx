import styles from './TableHead.module.scss';
import {FC, useCallback, useState} from 'react';
import {Headers, SortByType} from "@features/calls-table/types/tableTypes.ts";
import {ArrowMiniIcon} from '@shared/ui/icons/ArrowMiniIcon.tsx';

interface TableHeadProps {
  headers: Headers[];
  onSort: (sortBy: SortByType | null) => void;
}

export const TableHead: FC<TableHeadProps> = ({headers, onSort}) => {
  const [activeSort, setActiveSort] = useState<SortByType | null>(null);

  const handleSort = useCallback((sortBy: SortByType) => {
    if (activeSort === sortBy) {
      setActiveSort(null);
      onSort(null);
    } else {
      setActiveSort(sortBy);
      onSort(sortBy);
    }
  }, [onSort, activeSort])

  return (
    <thead>
    <tr>
      {headers.map(({label, sortBy}) => (
        <th key={label} className={styles.headerCell}>
          {sortBy ? (
            <button className={`${styles.sortButton} ${activeSort === sortBy ? styles.sortButton_active : ''}`}
                    onClick={() => handleSort(sortBy)}>
              {label}
              <ArrowMiniIcon
                width={9}
                height={6}
                fill={activeSort === sortBy ? '#002CFB' : '#ADBFDF'}
                rotate={activeSort === sortBy ? 0 : 180}
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
