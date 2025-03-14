import {RootState} from "@app/store/store.ts";

export const selectCalls = (state: RootState) => state.calls;
export const selectCallsAudio = (state: RootState) => state.callsAudio;
