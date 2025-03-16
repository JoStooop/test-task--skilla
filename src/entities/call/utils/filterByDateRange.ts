import {Call} from "@app/store/slices/callsSlice.ts";
import {DateRange} from "@features/calls-table/types/tableOptionsTypes.ts";

export const filterCallsByDateRange = (call: Call, dateRange: DateRange) => {
  const callDate = new Date(call.date).toISOString().split('T')[0];
  return callDate >= dateRange.startDate && callDate <= dateRange.endDate;
};
