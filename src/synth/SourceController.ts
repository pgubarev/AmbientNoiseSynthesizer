export default class SourceController {
  sourceNode: AudioBufferSourceNode | null;

  private readonly _outputNode: AudioNode;

  constructor(outputNode: AudioNode) {
    this.sourceNode = null;
    this._outputNode = outputNode
  }

  setAudioBuffer(audioContext: AudioContext, buffer: AudioBuffer) {
    // Source node have to be recreated after buffer/sample changed, because of Web Audio API limitation

    if (this.sourceNode) {
      this.sourceNode.disconnect(this._outputNode);
    }

    this.sourceNode = audioContext.createBufferSource();
    this.sourceNode.loop = true;
    this.sourceNode.buffer = buffer;
    this.sourceNode.connect(this._outputNode);
    this.sourceNode.start();
  }

  setLoopParams(loopStart: number, loopEnd: number) {
    if (!this.sourceNode) return;

    this.sourceNode.loopStart = loopStart;
    this.sourceNode.loopEnd = loopEnd;
  }
}
