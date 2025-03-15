import styles from '@features/calls-table/ui/CallsTable.module.scss';
import {FC} from "react";
import {Call} from "@app/store/slices/callsSlice.ts";
import {ArrowIcon} from "@shared/ui/icons/ArrowIcon.tsx";
import {format} from "date-fns";
import {CallLead} from "@shared/ui/call-lead/CallLead.tsx";
import {CallStatus} from "@shared/ui/call-status/CallStatus.tsx";
import {convertSecondsToMinutes} from "@entities/call/utils/filterCalls.ts";
import {AudioPlayer} from "@shared/ui/audio-player/AudioPlayer.tsx";

interface TableRowProps {
  call: Call;
}

export const TableRow: FC<TableRowProps> = ({call}) => {
  const {
    status,
    in_out,
    date,
    time,
    person_avatar,
    person_name,
    contact_name,
    contact_company,
    to_number,
    errors,
    source,
  } = call;

  return (
    <tr>
      <td>
        <ArrowIcon status={status} inOut={in_out}/>
      </td>
      <td>{format(date, 'HH:mm')}</td>
      <td>
        <div>
          <img src={person_avatar} alt={person_name}/>
        </div>
      </td>
      <td>
        <CallLead
          contactName={contact_name}
          contactCompany={contact_company}
          toNumber={to_number}
        />
      </td>
      <td>{source}</td>
      <td>
        <CallStatus status={status} errors={errors}/>
      </td>
      <td>
        <div className={styles.durationCell}>
          <div className={styles.time}>
            {time !== 0 && <div>{convertSecondsToMinutes(time)}</div>}
          </div>
          {time !== 0 && (
            <div className={styles.audio}>
              <AudioPlayer call={call}/>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
