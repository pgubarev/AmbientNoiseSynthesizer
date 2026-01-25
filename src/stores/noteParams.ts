import { create } from 'zustand'

interface INoteParamsStore {
  gain: number;
  QFactor: number;

  subOctaveGain: number;
  upOctaveGain: number;

  setGain: (value: number) => void;
  setQFactor: (value: number) => void;
  setSubOctaveGain: (value: number) => void;
  setUpOctaveGain: (value: number) => void;
}

export const useNoteParamsStore = create<INoteParamsStore>(setState => ({
  // state
  gain: 30,
  QFactor: 1,
  subOctaveGain: 0,
  upOctaveGain: 0,

  setGain: (value: number) => setState({ gain: value }),
  setQFactor: (value: number) => setState({ QFactor: value }),
  setSubOctaveGain: (value: number) => setState({ subOctaveGain: value }),
  setUpOctaveGain: (value: number) => setState({ upOctaveGain: value }),
}));
