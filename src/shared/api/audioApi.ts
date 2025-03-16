import axios from 'axios';
import {API_TOKEN, API_URL_GET_RECORD} from "@shared/config.ts";

export const fetchRecordAudio = async (record: string, partnership_id: string): Promise<string> => {
  try {
    const response = await axios.post(
      API_URL_GET_RECORD,
      {
        record,
        partnership_id,
      },
      {
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );
    return URL.createObjectURL(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки аудио');
    } else {
      throw new Error('Неизвестная ошибка');
    }
  }
};
