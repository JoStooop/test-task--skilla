export const filterCallsByDateRange = (call: any, range: any) => {
  const callDate = new Date(call.date).toISOString().split('T')[0];
  return callDate >= range.startDate && callDate <= range.endDate;
};
