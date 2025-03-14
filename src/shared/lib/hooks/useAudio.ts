import { useState } from 'react';
import axios from 'axios';

export const useAudio = (record: string, partnershipId: string) => {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAudio = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.skilla.ru/mango/getRecord',
        {
          record,
          partnership_id: partnershipId,
        },
        {
          headers: {
            Authorization: 'Bearer testtoken',
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const url = URL.createObjectURL(response.data);
      setAudioSrc(url);
    } catch (error) {
      setError('Ошибка загрузки аудио');
      console.error('Ошибка загрузки аудио:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { audioSrc, isLoading, error, loadAudio };
};
