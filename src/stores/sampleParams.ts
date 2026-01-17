import { create } from 'zustand'

interface ISampleParamsStore {
  audioBuffer: AudioBuffer | null;
  duration: number;

  loopStart: number;
  loopEnd: number;

  setAudioBuffer: (value: AudioBuffer) => void;
  setLoopStart: (value: number) => void;
  setLoopEnd: (value: number) => void;
}

export const useSampleParamsStore = create<ISampleParamsStore>(setState => ({
  // state
  audioBuffer: null,
  duration: 0,
  loopStart: 0,
  loopEnd: 0,

  // actions
  setAudioBuffer: (value: AudioBuffer) => setState({
    audioBuffer: value,
    duration: value.duration,
    loopStart: 0,
    loopEnd: value.duration
  }),
  setLoopStart: (value: number) => setState(state => {
    return { loopStart: Math.min(state.loopEnd - 0.01, value) };
  }),
  setLoopEnd: (value: number) => setState(state => {
    return { loopEnd: Math.max(state.loopStart + 0.01, value) };
  }),
}));
