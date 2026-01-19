export default class Analyzer {
  node: AnalyserNode;

  constructor(context: AudioContext) {
    this.node = context.createAnalyser();
  }
}
