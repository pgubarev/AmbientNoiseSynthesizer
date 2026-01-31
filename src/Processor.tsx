import { useEffect } from 'react';

import { EventBus, NOTE_PRESSED, NOTE_RELEASED, INoteStateChangedEventPayload } from './bus';
import { useSampleFileStore, useSampleParamsStore } from './stores';

import { synth } from './synth';

EventBus.addEventListener(NOTE_PRESSED, event => {
  const payload = (event as CustomEvent).detail as INoteStateChangedEventPayload;
  synth.startPlayNote(payload.note, payload.octave);
});
EventBus.addEventListener(NOTE_RELEASED, event => {
  const payload = (event as CustomEvent).detail as INoteStateChangedEventPayload;
  synth.stopPlayNote(payload.note, payload.octave);
});

async function processUploadedFile(file: File) {
  const buffer = await file.arrayBuffer();
  const audioBuffer = await synth.audioContext.decodeAudioData(buffer);

  synth.setAudioBuffer(audioBuffer);

  return audioBuffer;
}

export function Processor() {
  const fileStore = useSampleFileStore();
  const sampleParamsStore = useSampleParamsStore();

  useEffect(() => {
    if (!fileStore.file) return;

    processUploadedFile(fileStore.file).then(audioBuffer => {
      sampleParamsStore.setAudioBuffer(audioBuffer);
    });
  }, [fileStore.file]);

  useEffect(() => {
    synth.setLoopParams(
      sampleParamsStore.loopStart,
      sampleParamsStore.loopEnd,
    );
  }, [
      sampleParamsStore.loopStart,
      sampleParamsStore.loopEnd,
  ]);

  return <></>
}
