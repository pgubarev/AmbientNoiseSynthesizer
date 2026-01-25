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

  readonly notes: NoteFilter;

  readonly channelMergeNode: ChannelMergerNode;
  readonly inputAnalyzer: Analyzer;
  readonly outputAnalyzer: Analyzer;

  constructor() {
    this.audioContext = new AudioContext();
    this.inputAnalyzer = new Analyzer(this.audioContext);
    this.outputAnalyzer = new Analyzer(this.audioContext);
    this.sourceController = new SourceController(this.inputAnalyzer.node);
    this.channelMergeNode = this.audioContext.createChannelMerger(32);

    this.notes = new NoteFilter(this.audioContext, this.inputAnalyzer.node, this.outputAnalyzer.node);

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
    this.notes.startPlayNote(note, octave);
  }

  stopPlayNote(note: string, octave: number) {
    this.notes.stopPlayNote(note,  octave);
  }
}

export const synth = new Synth();
