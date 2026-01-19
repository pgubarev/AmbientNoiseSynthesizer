import NoteFilter from './Note';
import SourceController from './SourceController';
import Analyzer from './Analyzer';

export class Synth {
  // Main synth class.
  // Connects other synth classes with source and destination nodes
  // Final route:
  // SourceNode -> InputAnalyzer -> NoteFilter -> Any FX Nodes -> ChannelMergeNode -> OutputAnalyzer -> Destination

  readonly audioContext: AudioContext;
  readonly sourceController: SourceController;

  readonly activeNoteNodes: Map<string, BiquadFilterNode>;

  readonly notes: NoteFilter;

  readonly channelMergeNode: ChannelMergerNode;
  readonly inputAnalyzer: Analyzer;
  readonly outputAnalyzer: Analyzer;

  constructor() {
    this.audioContext = new AudioContext();
    this.sourceController = new SourceController();
    this.inputAnalyzer = new Analyzer(this.audioContext);
    this.outputAnalyzer = new Analyzer(this.audioContext);
    this.channelMergeNode = this.audioContext.createChannelMerger(32);

    this.notes = new NoteFilter(this.audioContext);
    this.activeNoteNodes = new Map();

    this.notes.nodes.forEach(node => {
      this.inputAnalyzer.node.connect(node);
      node.connect(this.outputAnalyzer.node);
    });

    // Connect output nodes
    this.channelMergeNode.connect(this.outputAnalyzer.node);
    this.outputAnalyzer.node.connect(this.audioContext.destination);
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
