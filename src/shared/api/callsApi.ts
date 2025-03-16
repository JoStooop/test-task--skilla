import axios from 'axios';
import { Call } from '@app/store/slices/callsSlice.ts';
import {API_TOKEN, API_URL} from "@shared/config.ts";

interface ApiResponse {
  results: Call[];
  total_rows: string;
}

export const fetchCallsApi = async (): Promise<Call[]> => {
  try {
    const { data } = await axios.post<ApiResponse>(
      API_URL,
      null,
      {
        headers: {
          Authorization: API_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Ошибка загрузки данных');
    } else {
      throw new Error('Неизвестная ошибка');
    }
  }
};
