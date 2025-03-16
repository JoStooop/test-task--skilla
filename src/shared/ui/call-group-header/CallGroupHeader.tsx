import styles from './CallGroupHeader.module.scss'
import {FC} from 'react';

interface CallGroupHeaderProps {
  groupName: string;
  callCount: number;
}

export const CallGroupHeader: FC<CallGroupHeaderProps> = ({groupName, callCount}) => {
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        {groupName} <span className={styles.title}>{callCount}</span>
      </td>
    </tr>
  );
};
