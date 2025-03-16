import {Call} from "@app/store/slices/callsSlice.ts";
import {FC} from "react";
import {CallGroupHeader} from "@shared/ui/call-group-header/CallGroupHeader.tsx";
import {TableRow} from "@shared/ui/table-row/TableRow.tsx";

interface CallGroupProps {
  groupName?: string;
  calls: Call[];
}

export const CallGroup: FC<CallGroupProps> = ({ groupName, calls }) => {
  return (
    <>
      {groupName && <CallGroupHeader groupName={groupName} callCount={calls.length} />}
      {calls.map((call) => (
        <TableRow key={call.id} call={call} />
      ))}
    </>
  );
};
