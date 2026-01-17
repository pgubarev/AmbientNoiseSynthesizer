import { useCallback, useEffect, useState } from 'react';

import { EventBus, NOTE_PRESSED, NOTE_RELEASED } from '../../../../bus';
import { BoxWrapper } from '../../../../components';

import { NOTES } from '../../../../synth/constants';
import { KeysContainer, KeyButton } from './styled';

type TKeyProps = { note: string, octave: number };

function dispatchNoteStateChanged(eventType: string, note: string, octave: number) {
  const event = new CustomEvent(
    eventType,
    { detail: { note, octave }, },
  );
  EventBus.dispatchEvent(event);
}

const keyboardNotesMap: { [key: string]: string } = {
  'C3': 'z',
  'C#3': 's',
  'D3': 'x',
  'D#3': 'd',
  'E3': 'c',
  'F3': 'v',
  'F#3': 'g',
  'G3': 'b',
  'G#3': 'h',
  'A3': 'n',
  'A#3': 'j',
  'B3': 'm',
  'C4': 'q',
  'C#4': '2',
  'D4': 'w',
  'D#4': '3',
  'E4': 'e',
  'F4': 'r',
  'F#4': '5',
  'G4': 't',
  'G#4': '6',
  'A4': 'y',
  'A#4': '7',
  'B4': 'u',
  'C5': 'i',
  'C#5': '9',
  'D5': 'o',
  'D#5': '0',
  'E5': 'p',
}

function Key(props: TKeyProps) {
  const key = props.note.concat(props.octave.toString());
  const [pressed, setPressed] = useState<boolean>(false);

  const handleNotePressed = useCallback(() => {
    setPressed(true);
    dispatchNoteStateChanged(NOTE_PRESSED, props.note, props.octave);
  }, []);

  const handleNoteReleased = useCallback(() => {
    setPressed(false);
    dispatchNoteStateChanged(NOTE_RELEASED, props.note, props.octave);
  }, []);

  useEffect(() => {
    const boardKey = keyboardNotesMap[key];
    if (!boardKey) return;

    document.addEventListener(
      "keydown",
      (event) => {
        if (keyboardNotesMap[key] != event.key.toLowerCase()) return;
        setPressed(true);
        dispatchNoteStateChanged(NOTE_PRESSED, props.note, props.octave);
      },
      false,
    );

    document.addEventListener(
      "keyup",
      (event) => {
        if (keyboardNotesMap[key] != event.key.toLowerCase()) return;
        setPressed(false);
        dispatchNoteStateChanged(NOTE_RELEASED, props.note, props.octave);
      },
      false,
    );
  }, [])

  return (
    <KeyButton
      $isBlack={props.note.indexOf('#') != -1}
      $pressed={pressed}
      onMouseLeave={handleNoteReleased}
      onMouseDown={handleNotePressed}
      onMouseUp={handleNoteReleased}
    >{keyboardNotesMap[key]}</KeyButton>
  )
}

export function Keyboard() {
  const keys: TKeyProps[] = [];
  NOTES.forEach((octaveNotes, octave) => {
    for (const [note] of Object.entries(octaveNotes)) {
      const key = note.concat(octave.toString());
      if (keyboardNotesMap[key]) {
        keys.push({ note, octave });
      }
    }
  });

  return (
    <BoxWrapper>
      <h1>KEYBOARD</h1>
      <KeysContainer>
        {
          keys.map(params => {
            const key = params.note.concat(params.octave.toString());
            return <Key key={key} note={params.note} octave={params.octave}/>
          })
        }
      </KeysContainer>
    </ BoxWrapper>
  )
}
