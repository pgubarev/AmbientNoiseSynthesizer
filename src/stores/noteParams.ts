import { create } from 'zustand'

interface INoteParamsStore {
  gain: number;
  QFactor: number;

  setGain: (value: number) => void;
  setQFactor: (value: number) => void;
}

export const useNoteParamsStore = create<INoteParamsStore>(setState => ({
  // state
  gain: 30,
  QFactor: 1,

  setGain: (value: number) => setState({ gain: value }),
  setQFactor: (value: number) => setState({ QFactor: value }),
}));
