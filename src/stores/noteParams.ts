import { create } from 'zustand'

import { synth } from '../synth';

interface INoteParamsStore {
  gain: number;
  QFactor: number;

  subOctaveGain: number;
  upOctaveGain: number;
  upOctaveType: string;

  oscillatorGain: number;
  oscillatorType: string;
  oscillatorNoteType: string;

  setGain: (value: number) => void;
  setQFactor: (value: number) => void;
  setSubOctaveGain: (value: number) => void;
  setUpOctaveGain: (value: number) => void;
  setUpOctaveType: (value: string) => void;

  setOscillatorGain: (value: number) => void;
  setOscillatorType: (value: string) => void;
  setOscillatorNoteType: (value: string) => void;
}

export const useNoteParamsStore = create<INoteParamsStore>(setState => ({
  // state
  gain: 30,
  QFactor: 1,
  subOctaveGain: 0,
  upOctaveGain: 0,
  upOctaveType: '+1',

  oscillatorGain: 0,
  oscillatorType: 'sawtooth',
  oscillatorNoteType: 'note',

  setGain: (value: number) => {
    setState({ gain: value });
    synth.notes.setNoteGain(value);
  },
  setQFactor: (value: number) => {
    setState({ QFactor: value });
    synth.notes.setNoteQFactor(value);
  },
  setSubOctaveGain: (value: number) => {
    setState({ subOctaveGain: value });
    synth.notes.setSubOctaveGain(value);
  },
  setUpOctaveGain: (value: number) => {
    setState({ upOctaveGain: value });
    synth.notes.setUpOctaveGain(value);
  },
  setUpOctaveType: (value: string) => {
    setState({ upOctaveType: value });
    synth.notes.setUpOctaveType(value);
  },

  setOscillatorGain: (value: number) => {
    setState({ oscillatorGain: value });
    synth.notes.setOscillatorGain(value);
  },
  setOscillatorType: (value: string) => {
    setState({ oscillatorType: value });
    synth.notes.setOscillatorType(value);
  },
  setOscillatorNoteType: (value: string) => {
    setState({ oscillatorNoteType: value });
    synth.notes.setOscillatorNoteType(value);
  }
}));
