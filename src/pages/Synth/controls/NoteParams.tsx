import { ChangeEvent, useCallback } from 'react';

import { BoxWrapper, RangeInput } from '../../../components';
import { useNoteParamsStore } from '../../../stores';

export function NoteParams() {
  // Note: Q factor values between -1000 and 1000, but should be positive for peaking filters.
  // In this component we pass value as value + 1000 to range input and
  // value - 1000 to store, just to avoid problems with rander input.

  const store = useNoteParamsStore();

  const handleGainChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setGain(value as number);
  }, []);

  const handleQFactorChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setQFactor(value as number);
  }, []);

  return (
    <BoxWrapper>
      <h1>NOTE FILTER</h1>
      <RangeInput
        name='gain'
        label='GAIN'
        min={0}
        max={100}
        value={ store.gain }
        onChange={handleGainChange}
      />
      <RangeInput
        name='qfactor'
        label='Q Factor'
        min={0}
        max={100}
        value={ store.QFactor }
        onChange={handleQFactorChange}
      />
    </ BoxWrapper>
  )
}
