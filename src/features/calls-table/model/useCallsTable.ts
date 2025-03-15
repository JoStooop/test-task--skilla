import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalls } from '@app/store/selectors/callsSelector.ts';
import { fetchCalls } from '@app/store/slices/callsSlice.ts';
import { AppDispatch } from '@app/store/store.ts';
import { filterCallsByType, filterCallsByDateRange } from '@entities/call/utils/filterCalls';

export const useCallsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: calls, status, error } = useSelector(selectCalls);

  const [filterType, setFilterType] = useState('Все типы');
  const [filterDateRange, setFilterDateRange] = useState<any>({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [sortBy, setSortBy] = useState<'date' | 'duration' | null>(null);

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  const filteredCalls = calls
    .filter((call) => filterCallsByType(call, filterType))
    .filter((call) => filterCallsByDateRange(call, filterDateRange));

  const sortCalls = (calls: any[], sortBy: 'date' | 'duration' | null) => {
    if (!sortBy) return calls;

    return [...calls].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'duration') {
        return a.time - b.time;
      }
      return 0;
    });
  };

  const sortedCalls = sortCalls(filteredCalls, sortBy);

  return {
    filteredCalls: sortedCalls,
    setFilterType,
    setFilterDateRange,
    setSortBy,
    status,
    error,
  };
};
