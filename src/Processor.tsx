import { useEffect } from 'react';

import { EventBus, NOTE_PRESSED, NOTE_RELEASED, INoteStateChangedEventPayload } from './bus';
import {
  useNoteParamsStore,
  useSampleFileStore,
  useSampleParamsStore,
} from './stores';

import { Synth } from './synth';

const synth: Synth = new Synth();

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
  const noteParamsStore = useNoteParamsStore();

  useEffect(() => {
    if (!fileStore.file) return;
    console.log('updated');

    processUploadedFile(fileStore.file).then(audioBuffer => {
      console.log('duration', audioBuffer.duration);
      sampleParamsStore.setAudioBuffer(audioBuffer);
    });
  }, [fileStore.file]);

  // TODO: убрать все useEffect ниже и явно вызывать установку значений синту на уровне store.
  useEffect(() => {
    synth.setLoopParams(
      sampleParamsStore.loopStart,
      sampleParamsStore.loopEnd,
    );
  }, [
      sampleParamsStore.loopStart,
      sampleParamsStore.loopEnd,
  ]);

  useEffect(() => {
    synth.notes.setNoteGain(noteParamsStore.gain);
  }, [noteParamsStore.gain]);

  useEffect(() => {
    synth.notes.setNoteQFactor(noteParamsStore.QFactor);
  }, [noteParamsStore.QFactor]);

  useEffect(() => {
    synth.notes.setSubOctaveGain(noteParamsStore.subOctaveGain);
  }, [noteParamsStore.subOctaveGain]);

  useEffect(() => {
    synth.notes.setUpOctaveGain(noteParamsStore.upOctaveGain);
  }, [noteParamsStore.upOctaveGain]);

  useEffect(() => {
    synth.notes.setUpOctaveType(noteParamsStore.upOctaveType);
  }, [noteParamsStore.upOctaveType]);

  useEffect(() => {
    synth.notes.setOscillatorGain(noteParamsStore.oscillatorGain);
  }, [noteParamsStore.oscillatorGain]);

  useEffect(() => {
    synth.notes.setOscillatorType(noteParamsStore.oscillatorType);
  }, [noteParamsStore.oscillatorType]);

  useEffect(() => {
    synth.notes.setOscillatorNoteType(noteParamsStore.oscillatorNoteType);
  }, [noteParamsStore.oscillatorNoteType]);

  return <></>
}
