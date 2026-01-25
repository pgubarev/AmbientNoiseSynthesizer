import { createEQNode } from './utils'

import { NOTES } from './constants';


class Note {
  private readonly _main_note: BiquadFilterNode;
  private readonly _octave_down_note: BiquadFilterNode;
  private readonly _octave_up_note: BiquadFilterNode;

  constructor(audioContext: AudioContext, frequency: number) {
    this._main_note = createEQNode(audioContext, frequency);
    this._octave_up_note = createEQNode(audioContext, frequency * 2);
    this._octave_down_note = createEQNode(audioContext, frequency / 2);

    this._octave_down_note.connect(this._main_note);
    this._main_note.connect(this._octave_up_note);

    this._octave_down_note.gain.value = 0;
    this._octave_up_note.gain.value = 0;
  }

  setGain(value: number) {
    this._main_note.gain.value = value;
  }

  setSubOctaveGain(value: number) {
    this._octave_down_note.gain.value = value;
  }

  setUpOctaveGain(value: number) {
    this._octave_up_note.gain.value = value;
  }

  setQFactor(value: number) {
    this._main_note.Q.value = value;
    this._octave_up_note.Q.value = value;
    this._octave_down_note.Q.value = value;
  }

  startPlay(input: AudioNode) {
    input.connect(this._octave_down_note);
    // input.connect(this._octave_down_note);
    // input.connect(this._octave_up_note);
  }

  stopPlay(input: AudioNode) {
    input.disconnect(this._octave_down_note);
    // input.disconnect(this._octave_down_note);
    // input.disconnect(this._octave_up_note);
  }

  connectToOutput(oputput: AudioNode) {
    this._octave_up_note.connect(oputput);
    // this._octave_up_note.connect(oputput);
    // this._octave_down_note.connect(oputput);
  }
}

export default class Notes {
  nodes: Map<string, Note>;
  readonly activeNoteNodes: Map<string, Note>;
  private readonly _inputNode: AudioNode;

  constructor(audioContext: AudioContext, inputNode: AudioNode, outputNode: AudioNode) {
    this.nodes = new Map();
    this.activeNoteNodes = new Map();

    this._inputNode = inputNode;

    NOTES.forEach((octaveNotes, octave) => {
      for (const [note, frequency] of Object.entries(octaveNotes)) {
        const key = note.concat(octave.toString());
        const node = new Note(audioContext, frequency);

        this.nodes.set(key, node);
        node.connectToOutput(outputNode);
      }
    });
  }

  setNoteGain(value: number) {
    this.nodes.forEach(node => {
      node.setGain(value);
    });
  }

  setNoteQFactor(value: number) {
    this.nodes.forEach(node => {
      node.setQFactor(value);
    });
  }

  setSubOctaveGain(value: number) {
    this.nodes.forEach(node => {
      node.setSubOctaveGain(value);
    });
  }

  setUpOctaveGain(value: number) {
    this.nodes.forEach(node => {
      node.setUpOctaveGain(value);
    });
  }

  startPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    if (this.activeNoteNodes.has(key)) return;

    const node = this.nodes.get(key)!;
    this.activeNoteNodes.set(key, node);

    node.startPlay(this._inputNode);
  }

  stopPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    const node = this.activeNoteNodes.get(key);
    if (!node) return;

    this.activeNoteNodes.delete(key);
    node.stopPlay(this._inputNode);
  }
}
