import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export interface Call {
  id: number;
  person_avatar: string;
  person_name: string;
  partnership_id: string;
  partner_data: {
    id: string;
    name: string;
    phone: string;
  };
  date: string;
  date_notime: string;
  disconnect_reason: string;
  from_number: string;
  in_out: number;
  record: string;
  results: any[];
  source: string;
  stages: any[];
  status: string;
  time: number;
  contact_name: string;
  contact_company: string;
  to_number: string;
  errors: string[];
}

interface ApiResponse {
  results: Call[];
  total_rows: string;
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
    try {
      const {data} = await axios.post<ApiResponse>(
        'https://api.skilla.ru/mango/getList',
        null,
        {
          headers: {
            Authorization: 'Bearer testtoken',
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
