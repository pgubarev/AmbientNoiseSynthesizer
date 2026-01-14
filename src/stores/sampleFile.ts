import { create } from 'zustand'

interface ISampleFileStore {
  file: File | null,
  setFile: (file: File) => void;
}

export const useSampleFileStore = create<ISampleFileStore>(setState => ({
  // state
  file: null,

  // actions
  setFile: (value: File | null) => setState({file: value}),
}));
