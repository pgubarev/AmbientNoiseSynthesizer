import { create } from 'zustand'

interface ISampleParamsStore {
  duration: number;

  loopStart: number;
  loopEnd: number;

  setDuration: (value: number) => void;
  setLoopStart: (value: number) => void;
  setLoopEnd: (value: number) => void;
}

export const useSampleParamsStore = create<ISampleParamsStore>(setState => ({
  // state
  duration: 0,
  loopStart: 0,
  loopEnd: 0,

  // actions
  setDuration: (value: number) => setState({ duration: value, loopStart: 0, loopEnd: value }),
  setLoopStart: (value: number) => setState(state => {
    return { loopStart: Math.min(state.loopEnd - 0.01, value) };
  }),
  setLoopEnd: (value: number) => setState(state => {
    return { loopEnd: Math.max(state.loopStart + 0.01, value) };
  }),
}));
