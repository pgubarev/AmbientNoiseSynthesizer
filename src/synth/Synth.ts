import NoteFilter from './Note';
import SourceController from './SourceController';

export class Synth {
  // Main synth class.
  // Connects other synth classes with source and destination nodes

  readonly audioContext: AudioContext;
  readonly sourceController: SourceController;

  readonly activeNoteNodes: Map<string, BiquadFilterNode>;

  readonly notes: NoteFilter;

  constructor() {
    this.audioContext = new AudioContext();
    this.sourceController = new SourceController();

    this.notes = new NoteFilter(this.audioContext);
    this.activeNoteNodes = new Map();

    this.notes.nodes.forEach(node => node.connect(this.audioContext.destination));
  }

  setAudioBuffer(buffer: AudioBuffer) {
    this.sourceController.setAudioBuffer(this.audioContext, buffer);
  }

  setLoopParams(loopStart: number, loopEnd: number) {
    this.sourceController.setLoopParams(loopStart, loopEnd);
  }

  startPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    if (this.activeNoteNodes.has(key)) return;

    const node = this.notes.nodes.get(key)!;
    this.activeNoteNodes.set(key, node);

    this.sourceController.sourceNode!.connect(node);
  }

  stopPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    const node = this.activeNoteNodes.get(key);
    if (!node) return;

    this.activeNoteNodes.delete(key);
    this.sourceController.sourceNode!.disconnect(node);
  }
}
