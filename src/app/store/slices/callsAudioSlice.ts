import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface callsAudioState {
  // data: string | null;
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: callsAudioState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchRecordData = createAsyncThunk(
  'callsAudio/fetchRecordData',
  async ({ record, partnershipId }: { record: string; partnershipId: string }) => {
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
          responseType: 'blob', // Для загрузки аудио как Blob
        }
      );
      return URL.createObjectURL(response.data); // Создаем URL для Blob
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Ошибка загрузки аудио');
      } else {
        throw new Error('Неизвестная ошибка');
      }
    }
  }
);

const callsAudioSlice = createSlice({
  name: 'callsAudio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecordData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRecordData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchRecordData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки аудио';
      });
  },
});

export default callsAudioSlice.reducer;
