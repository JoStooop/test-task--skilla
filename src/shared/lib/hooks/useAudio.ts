import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRecordData} from '@app/store/slices/callsAudioSlice';
import {AppDispatch} from '@app/store/store';
import {selectCallsAudio} from "@app/store/selectors/callsSelector.ts";

type UseAudioType = {
  record?: string;
  partnership_id?: string;
};

export const useAudio = ({record = undefined, partnership_id = undefined}: UseAudioType) => {
  // {record= undefined, partnership_id=undefined} -> undefined заглушка
  // {record, partnership_id} - по итогу вот так должно быть
  const dispatch = useDispatch<AppDispatch>();
  const {data: audioSrc, status, error} = useSelector(selectCallsAudio);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (record && partnership_id) {
      setIsLoading(true);
      dispatch(fetchRecordData({record, partnership_id}))
        .unwrap()
        .catch((err) => {
          console.error('Ошибка загрузки аудио:', err);
        })
        .finally(() => setIsLoading(false));
    }
  }, [record, partnership_id, dispatch]);

  return {audioSrc, isLoading: isLoading || status === 'loading', error};
};
