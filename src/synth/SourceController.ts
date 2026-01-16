export default class SourceController {
  sourceNode: AudioBufferSourceNode | null;

  constructor() {
    this.sourceNode = null;
  }

  setAudioBuffer(audioContext: AudioContext, buffer: AudioBuffer) {
    this.sourceNode = audioContext.createBufferSource();
    this.sourceNode.loop = true;
    this.sourceNode.buffer = buffer;
    this.sourceNode.start();
  }

  setLoopParams(loopStart: number, loopEnd: number) {
    if (!this.sourceNode) return;

    this.sourceNode.loopStart = loopStart;
    this.sourceNode.loopEnd = loopEnd;
  }
}
