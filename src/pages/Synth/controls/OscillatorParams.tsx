import { ChangeEvent, useCallback } from 'react';

import { BoxWrapper, Column, Row, RangeInput, TitleText, Select } from '../../../components';
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

  const handleOscillatorNoteTypeChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setOscillatorNoteType(value as string);
  }, []);

  return (
    <BoxWrapper>
      <TitleText>Осцилятор</TitleText>

      <Row>
        <Column>
          <RangeInput
            name='gain'
            label='Усиление'
            min={0}
            max={200}
            value={ store.oscillatorGain * 100 }
            onChange={handleOscillatorGainChange}
          />
          <Select
            label='Тип волны'
            name='osillatorType'
            onChange={handleOscillatorTypeChange}
            value={store.oscillatorType}
            options={['sine', 'square', 'sawtooth', 'triangle']}
          />
          <Select
            label='Высота'
            name='osillatorNoteType'
            onChange={handleOscillatorNoteTypeChange}
            value={store.oscillatorNoteType}
            options={['note', '-octave', 'octave', 'octave + 1']}
          />
        </Column>
      </Row>
    </ BoxWrapper>
  )
}
