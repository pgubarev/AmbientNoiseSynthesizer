import { create } from 'zustand'

interface IPagesStore {
  currentPage: 'Synth' | 'HowItWorks' | 'About',
  setCurrentPage: (value: 'Synth' | 'HowItWorks' | 'About') => void;
}

export const usePagesStore = create<IPagesStore>(setState => ({
  // state
  currentPage: 'Synth',

  // actions
  setCurrentPage: (value: 'Synth' | 'HowItWorks' | 'About') => setState({currentPage: value}),
}));
