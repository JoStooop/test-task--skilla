import styles from '@features/calls-table/ui/CallsTable.module.scss';
import {FC} from 'react';
import {format} from 'date-fns';
import {CallStatus} from '@shared/ui/call-status/CallStatus.tsx';
import {AudioPlayer} from '@shared/ui/audio-player/AudioPlayer.tsx';
import {CallLead} from '@shared/ui/call-lead/CallLead.tsx';
import {ArrowIcon} from '@shared/ui/icons/ArrowIcon.tsx';
import {convertSecondsToMinutes} from '@entities/call/utils/filterCalls.ts';
import {Call} from "@app/store/slices/callsSlice.ts";

interface TableBodyProps {
  calls: Call[];
}

export const TableBody: FC<TableBodyProps> = ({calls}) => {
  return (
    <tbody>
    {calls.map((call: any) => (
      <tr key={call.id}>
        <td>
          <ArrowIcon status={call.status} inOut={call.in_out}/>
        </td>
        <td>{format(call.date, 'HH:mm')}</td>
        <td>
          <div>
            <img src={call.person_avatar} alt={call.person_name}/>
          </div>
        </td>
        <td>
          <CallLead
            contactName={call.contact_name}
            contactCompany={call.contact_company}
            toNumber={call.to_number}
          />
        </td>
        <td>{call.source}</td>
        <td>
          <CallStatus status={call.status} errors={call.errors}/>
        </td>
        <td>
          <div className={styles.durationCell}>
            <div className={styles.time}>
              {call.time !== 0 && <div>{convertSecondsToMinutes(call.time)}</div>}
            </div>
            {call.time !== 0 && (
              <div className={styles.audio}>
                <AudioPlayer time={call.time} record={call.record} partnershipId={call.partnership_id}/>
              </div>
            )}
          </div>
        </td>
      </tr>
    ))}
    </tbody>
  );
};
