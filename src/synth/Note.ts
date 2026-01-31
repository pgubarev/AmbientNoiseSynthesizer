import { createEQNode } from './utils'

import { NOTES } from './constants';

class Note {
  private readonly _main_note: BiquadFilterNode;
  private readonly _octave_down_note: BiquadFilterNode;
  private readonly _octave_up_note: BiquadFilterNode;

  private readonly _oscillator: OscillatorNode;
  private readonly _oscillatorGain: GainNode;
  private readonly _outputNode: AudioNode;

  constructor(audioContext: AudioContext, frequency: number, input: AudioNode, output: AudioNode) {
    this._main_note = createEQNode(audioContext, frequency);
    this._octave_up_note = createEQNode(audioContext, frequency * 2);
    this._octave_down_note = createEQNode(audioContext, frequency / 2);

    this._octave_down_note.connect(this._main_note);
    this._main_note.connect(this._octave_up_note);

    this._octave_down_note.gain.value = 0;
    this._octave_up_note.gain.value = 0;

    this._oscillator = audioContext.createOscillator();
    this._oscillator.type = 'sawtooth';
    this._oscillator.frequency.value = frequency;
    this._oscillator.start();

    this._oscillatorGain = audioContext.createGain();
    this._oscillatorGain.gain.value = 0;
    this._oscillator.connect(this._oscillatorGain);

    input.connect(this._octave_down_note);
    this._outputNode = output;
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

  setUpOctaveType(value: string) {
    const frequency = value == '+2' ?
      this._main_note.frequency.value * 3 :
      this._main_note.frequency.value * 2;
    this._octave_up_note.frequency.value = frequency;
  }

  setOscillatorGain(value: number) {
    this._oscillatorGain.gain.value = value;
  }

  setOscillatorType(value: string) {
    // @ts-ignore
    this._oscillator.type = value;
  }

  setOscillatorNoteType(value: string) {
    let frequency = this._main_note.frequency.value;
    if (value === '-octave') frequency = frequency /= 2;
    if (value === 'octave') frequency = frequency *= 2;
    if (value === 'octave + 1') frequency = frequency *= 3;
    this._oscillator.frequency.value = frequency;
  }

  startPlay() {
    this._oscillatorGain.connect(this._outputNode);
    this._octave_up_note.connect(this._outputNode);
  }

  stopPlay() {
    this._oscillatorGain.disconnect(this._outputNode);
    this._octave_up_note.disconnect(this._outputNode);
  }
}

export default class Notes {
  nodes: Map<string, Note>;
  readonly activeNoteNodes: Map<string, Note>;

  constructor(audioContext: AudioContext, inputNode: AudioNode, outputNode: AudioNode) {
    this.nodes = new Map();
    this.activeNoteNodes = new Map();

    NOTES.forEach((octaveNotes, octave) => {
      for (const [note, frequency] of Object.entries(octaveNotes)) {
        const key = note.concat(octave.toString());
        const node = new Note(audioContext, frequency, inputNode, outputNode);

        this.nodes.set(key, node);
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

  setUpOctaveType(value: string) {
    this.nodes.forEach(node => {
      node.setUpOctaveType(value);
    })
  }

  setOscillatorGain(value: number) {
    this.nodes.forEach(node => {
      node.setOscillatorGain(value);
    });
  }

  setOscillatorType(value: string) {
    this.nodes.forEach(node => {
      node.setOscillatorType(value);
    });
  }

  setOscillatorNoteType(value: string) {
    this.nodes.forEach(node => {
      node.setOscillatorNoteType(value);
    });
  }

  startPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    if (this.activeNoteNodes.has(key)) return;

    const node = this.nodes.get(key)!;
    this.activeNoteNodes.set(key, node);

    node.startPlay();
  }

  stopPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    const node = this.activeNoteNodes.get(key);
    if (!node) return;

    this.activeNoteNodes.delete(key);
    node.stopPlay();
  }
}
