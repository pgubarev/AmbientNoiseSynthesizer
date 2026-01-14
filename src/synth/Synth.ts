import NoteFilter from './Note';

export class Synth {
  // Main synth class.
  // Connects other synth classes with source and destination nodes

  readonly audioContext: AudioContext;
  readonly sourceNode: AudioBufferSourceNode;

  readonly activeNoteNodes: Map<string, BiquadFilterNode>;

  readonly notes: NoteFilter;

  constructor() {
    this.audioContext = new AudioContext();
    this.sourceNode = this.audioContext.createBufferSource();

    this.notes = new NoteFilter(this.audioContext);
    this.activeNoteNodes = new Map();

    this.sourceNode.loop = true;
    this.notes.nodes.forEach(node => node.connect(this.audioContext.destination));
  }

  setAudioBuffer(buffer: AudioBuffer) {
    // TODO: Source node have to be recreated after buffer changed

    this.sourceNode.buffer = buffer;

    // auto start once, to avoid any problems with call start twice
    this.sourceNode.start();
  }

  setLoopParams(loopStart: number, loopEnd: number) {
    this.sourceNode.loopStart = loopStart;
    this.sourceNode.loopEnd = loopEnd;
  }

  startPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    if (this.activeNoteNodes.has(key)) return;

    const node = this.notes.nodes.get(key)!;
    this.activeNoteNodes.set(key, node);

    this.sourceNode.connect(node);
  }

  stopPlayNote(note: string, octave: number) {
    const key = note.concat(octave.toFixed());
    const node = this.activeNoteNodes.get(key);
    if (!node) return;

    this.activeNoteNodes.delete(key);
    this.sourceNode.disconnect(node);
  }
}
