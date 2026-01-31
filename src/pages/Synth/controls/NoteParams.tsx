import { ChangeEvent, useCallback } from 'react';

import { BoxWrapper, Column, Row, RangeInput, TitleText, Select } from '../../../components';
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

  const handleSubOctaveGainChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setSubOctaveGain(value as number);
  }, []);

  const handleUpOctaveGainChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setUpOctaveGain(value as number);
  }, []);

  const handleUpOctaveTypeChange = useCallback((event: ChangeEvent | InputEvent) => {
    const value = (event.target as HTMLInputElement).value as unknown;
    store.setUpOctaveType(value as string);
  }, []);


  return (
    <BoxWrapper>
      <TitleText>Настройки тона</TitleText>

      <Row>
        <Column>
          <RangeInput
            name='gain'
            label='Усиление'
            min={0}
            max={100}
            value={ store.gain }
            onChange={handleGainChange}
          />
          <RangeInput
            name='qfactor'
            label='Q-фактор'
            min={0}
            max={100}
            value={ store.QFactor }
            onChange={handleQFactorChange}
          />
        </Column>
        <Column>
          <RangeInput
            name='subOctaveGain'
            label='Октава вниз'
            min={0}
            max={100}
            value={ store.subOctaveGain }
            onChange={handleSubOctaveGainChange}
          />
          <RangeInput
            name='upOctaveGain'
            label='Октава вверх'
            min={0}
            max={100}
            value={ store.upOctaveGain }
            onChange={handleUpOctaveGainChange}
          />
          <Select
            label='Тип октары вверх'
            name='upOctaveType'
            onChange={handleUpOctaveTypeChange}
            value={store.upOctaveType}
            options={['+1', '+2']}
          ></Select>
        </Column>
      </Row>
    </ BoxWrapper>
  )
}
