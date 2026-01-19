import { createEQNode } from './utils'

import { NOTES } from './constants';

export default class Notes {
  nodes: Map<string, BiquadFilterNode>;
  readonly activeNoteNodes: Map<string, BiquadFilterNode>;
  private readonly _inputNode: AudioNode;

  constructor(audioContext: AudioContext, inputNode: AudioNode, outputNode: AudioNode) {
    this.nodes = new Map();
    this.activeNoteNodes = new Map();

    this._inputNode = inputNode;

    NOTES.forEach((octaveNotes, octave) => {
      for (const [note, frequency] of Object.entries(octaveNotes)) {
        const key = note.concat(octave.toString());
        const node = createEQNode(audioContext, frequency);

        this.nodes.set(key, node);
        node.connect(outputNode);
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

  startPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    if (this.activeNoteNodes.has(key)) return;

    const node = this.nodes.get(key)!;
    this.activeNoteNodes.set(key, node);

    this._inputNode.connect(node);
  }

  stopPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    const node = this.activeNoteNodes.get(key);
    if (!node) return;

    this.activeNoteNodes.delete(key);
    this._inputNode.disconnect(node);
  }
}
