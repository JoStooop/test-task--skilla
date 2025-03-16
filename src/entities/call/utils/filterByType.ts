import {Call} from "@app/store/slices/callsSlice.ts";

const FilterType = {
  INCOMING: 'Входящие',
  OUTGOING: 'Исходящие',
} as const;


export const filterCallsByType = (call: Call, filterType: string): boolean => {
  if (filterType === FilterType.INCOMING && call.in_out !== 1) return false;
  if (filterType === FilterType.OUTGOING && call.in_out !== 0) return false;
  return true;
};
