import {FC} from 'react';
import styles from './CallLead.module.scss';

interface LeadProps {
  contactName?: string;
  contactCompany?: string;
  toNumber?: string;
}

export const CallLead: FC<LeadProps> = ({contactName = '', contactCompany = '', toNumber = ''}) => {
  return (
    <div className={styles.lead}>
      {contactName && <div>{contactName}</div>}
      <div>
        {contactCompany ? (
          <div className={styles.company}>{contactCompany}</div>
        ) : (
          <div>{toNumber}</div>
        )}
      </div>
    </div>
  );
};
