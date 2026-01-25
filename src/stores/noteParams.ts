import { create } from 'zustand'

interface INoteParamsStore {
  gain: number;
  QFactor: number;

  subOctaveGain: number;
  upOctaveGain: number;

  oscillatorGain: number;
  oscillatorType: string;

  setGain: (value: number) => void;
  setQFactor: (value: number) => void;
  setSubOctaveGain: (value: number) => void;
  setUpOctaveGain: (value: number) => void;

  setOscillatorGain: (value: number) => void;
  setOscillatorType: (value: string) => void;
}

export const useNoteParamsStore = create<INoteParamsStore>(setState => ({
  // state
  gain: 30,
  QFactor: 1,
  subOctaveGain: 0,
  upOctaveGain: 0,

  oscillatorGain: 0,
  oscillatorType: 'sawtooth',

  setGain: (value: number) => setState({ gain: value }),
  setQFactor: (value: number) => setState({ QFactor: value }),
  setSubOctaveGain: (value: number) => setState({ subOctaveGain: value }),
  setUpOctaveGain: (value: number) => setState({ upOctaveGain: value }),

  setOscillatorGain: (value: number) => setState({ oscillatorGain: value }),
  setOscillatorType: (value: string) => setState({ oscillatorType: value }),
}));
