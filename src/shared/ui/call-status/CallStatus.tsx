import styles from './CallStatus.module.scss';
import {FC} from "react";

interface CallStatusProps {
  status: string;
  errors?: string[];
}

const statusMapping: { [key: string]: string } = {
  "Дозвонился": "Отлично",
  "Не дозвонился": "Плохо",
};

const statusClasses: { [key: string]: string } = {
  "Отлично": styles.success,
  // "Хорошо": styles.good,
  "Плохо": styles.bad,
};

export const CallStatus: FC<CallStatusProps> = ({status, errors = []}) => {
  const mappedStatus = statusMapping[status] || '';
  const statusClass = statusClasses[mappedStatus] || '';

  if (!mappedStatus) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={`${styles.badge} ${statusClass}`}>
        {mappedStatus}
      </div>
      {errors.length > 0 && (
        <div className={styles.error}>
          {errors[0]}
        </div>
      )}
    </div>
  );
};
