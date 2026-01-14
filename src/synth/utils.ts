import { DEFAULT_NOTE_EQ_GAIN, DEFAULT_NOTE_EQ_Q_FACTOR } from './constants';

export function createEQNode(
  audioContext: AudioContext,
  frequency: number,
): BiquadFilterNode {
  const eq = audioContext.createBiquadFilter();
  eq.frequency.value = frequency;
  eq.gain.value = DEFAULT_NOTE_EQ_GAIN;
  eq.type = 'peaking';
  eq.Q.value = DEFAULT_NOTE_EQ_Q_FACTOR;

  return eq;
}
