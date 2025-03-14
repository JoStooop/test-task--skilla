import {configureStore} from "@reduxjs/toolkit";
import callsReducer from './slices/callsSlice.ts'
import callsAudioSliceReducer from './slices/callsAudioSlice.ts'

export const store = configureStore({
  reducer: {
    calls: callsReducer,
    callsAudio: callsAudioSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
