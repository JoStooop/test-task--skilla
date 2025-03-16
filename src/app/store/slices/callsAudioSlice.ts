import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {fetchRecordAudio} from "@shared/api/audioApi.ts";

interface CallsAudioState {
  data: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CallsAudioState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchRecordData = createAsyncThunk(
  'callsAudio/fetchRecordData',
  async ({ record, partnership_id }: { record: string; partnership_id: string }) => {
    return await fetchRecordAudio(record, partnership_id);
  }
);

const callsAudioSlice = createSlice({
  name: 'callsAudio',
  initialState,
  reducers: {
    resetAudioState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
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

export const { resetAudioState } = callsAudioSlice.actions;
export default callsAudioSlice.reducer;
