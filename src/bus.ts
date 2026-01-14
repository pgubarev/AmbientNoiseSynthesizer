export const EventBus = new EventTarget();

export const NOTE_PRESSED = 'notePressed';
export const NOTE_RELEASED = 'noteReleased';

export interface INoteStateChangedEventPayload {
  note: string;
  octave: number;
}
