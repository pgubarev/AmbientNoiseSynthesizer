import { createEQNode } from './utils'

import { NOTES } from './constants';

export default class Notes {
  nodes: Map<string, BiquadFilterNode>;

  constructor(audioContext: AudioContext) {
    this.nodes = new Map();

    NOTES.forEach((octaveNotes, octave) => {
      for (const [note, frequency] of Object.entries(octaveNotes)) {
        const key = note.concat(octave.toString());
        const node = createEQNode(audioContext, frequency);

        this.nodes.set(key, node);
      }
    });
  }

  setNoteGain(value: number) {
    this.nodes.forEach(node => {
      node.gain.value = value;
    });
  }

  setNoteQFactor(value: number) {
    this.nodes.forEach(node => {
      node.Q.value = value;
    });
  }
}


/*
this.nodes = [
  createEQNode(audioContext, 110), // A2
  createEQNode(audioContext, 220), // A3
  createEQNode(audioContext, 329), // E4
  createEQNode(audioContext, 440), // A4
  createEQNode(audioContext, 523), // C5
  createEQNode(audioContext, 880), // A5
];
*/
