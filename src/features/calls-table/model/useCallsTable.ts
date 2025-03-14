import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectCalls} from '@app/store/selectors/callsSelector.ts';
import {fetchCalls} from '@app/store/slices/callsSlice.ts';
import {AppDispatch} from '@app/store/store.ts';
import {filterCallsByType, filterCallsByDate} from '@entities/call/utils/filterCalls';

export const useCallsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data: calls, status, error} = useSelector(selectCalls);

  const [filterType, setFilterType] = useState('Все типы');
  const [filterDate, setFilterDate] = useState('Неделя');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | null>(null);

  useEffect(() => {
    dispatch(fetchCalls())
  }, [dispatch]);

  const sortCalls = (calls: any[], sortBy: 'date' | 'duration' | null) => {
    if (!sortBy) return calls;

    return [...calls].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'duration') {
        return a.time - b.time
        // const durationA = convertSecondsToMinutes(Number(a.time) || 0);
        // const durationB = convertSecondsToMinutes(Number(b.time) || 0);
        //
        // if (durationA === 0 && durationB === 0) return 0;
        //
        // if (durationA === 0) return 1;
        // if (durationB === 0) return -1;
        //
        // return durationA - durationB;
      }
      return 0;
    });
  };

  const filteredCalls = calls
    .filter((call) => filterCallsByType(call, filterType))
    .filter((call) => filterCallsByDate([call], filterDate).length > 0);

  const sortedCalls = sortCalls(filteredCalls, sortBy);

  return {
    filteredCalls: sortedCalls,
    setFilterType,
    setFilterDate,
    setSortBy,
    status,
    error,
  };
};
