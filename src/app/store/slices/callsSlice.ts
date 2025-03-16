import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchCallsApi} from "@shared/api/callsApi.ts";

export interface Call {
  id: number;
  person_avatar: string;
  person_name: string;
  partnership_id: string;
  date: string;
  in_out: number;
  record: string;
  source: string;
  status: string;
  time: number;
  contact_name: string;
  contact_company: string;
  to_number: string;
  errors: string[];
}

interface CallsState {
  data: Call[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CallsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCalls = createAsyncThunk(
  'calls/fetchCalls',
  async () => {
    return await fetchCallsApi();
  }
);

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки данных';
      });
  },
});
export default callsSlice.reducer;
