import { ChangeEvent, useCallback } from 'react';

import { BoxWrapper, Column, Row, RangeInput, TitleText } from '../../../components';
import { useNoteParamsStore } from '../../../stores';

export function OscillatorParams() {
  const store = useNoteParamsStore();

  const handleOscillatorGainChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setOscillatorGain(value as number / 100);
  }, []);

  const handleOscillatorTypeChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setOscillatorType(value as string);
  }, []);

  return (
    <BoxWrapper>
      <TitleText>OSCILLATOR</TitleText>

      <Row>
        <Column>
          <RangeInput
            name='gain'
            label='GAIN'
            min={0}
            max={200}
            value={ store.oscillatorGain * 100 }
            onChange={handleOscillatorGainChange}
          />
          <select
            name="osillatorType"
            id="osillatorType"
            onChange={handleOscillatorTypeChange}
            value={store.oscillatorType}
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="sawtooth">Sawtooth</option>
            <option value="triangle">Triangle</option>
          </select>
        </Column>
      </Row>
    </ BoxWrapper>
  )
}
