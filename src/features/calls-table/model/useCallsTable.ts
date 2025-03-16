import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalls } from '@app/store/selectors/callsSelector.ts';
import {Call, fetchCalls} from '@app/store/slices/callsSlice.ts';
import { AppDispatch } from '@app/store/store.ts';
import { filterCallsByType } from '@entities/call/utils/filterByType.ts';
import { filterCallsByDateRange } from '@entities/call/utils/filterByDateRange.ts';
import { getDateRange } from '@entities/call/utils/dateUtils.ts';
import {OptionDate} from "@features/calls-table/types/tableOptionsTypes.ts";

interface DateRange {
  startDate: string;
  endDate: string;
}

export const useCallsTable = (selectedPeriod: OptionDate = 'Сегодня') => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: calls, status, error } = useSelector(selectCalls);

  const [filterType, setFilterType] = useState('Все типы');
  const [filterDateRange, setFilterDateRange] = useState<DateRange>(
    getDateRange(selectedPeriod)
  );
  const [sortBy, setSortBy] = useState<'date' | 'duration' | null>(null);

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  useEffect(() => {
    setFilterDateRange(getDateRange(selectedPeriod));
  }, [selectedPeriod]);


  const filteredCalls = calls
    .filter((call) => filterCallsByType(call, filterType))
    .filter((call) => filterCallsByDateRange(call, filterDateRange));

  const sortCalls = (calls: Call[], sortBy: 'date' | 'duration' | null) => {
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
