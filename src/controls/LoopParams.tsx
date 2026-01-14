import { useCallback } from 'react';

import { BoxWrapper, RangeInput } from '../components';
import { useSampleParamsStore } from '../stores';

export function LoopParams() {
  const store = useSampleParamsStore();

  // @ts-ignore
  const handleLoopStartChange = useCallback(event => {
    store.setLoopStart(event.target.value);
  }, []);

  // @ts-ignore
  const handleLoopEndChange = useCallback(event => {
    store.setLoopEnd(event.target.value);
  }, []);

  return (
    <BoxWrapper>
      <h1>LOOP PARAMS</h1>

      <RangeInput
        name="loopStart"
        label='START'
        min={0}
        max={store.duration}
        value={store.loopStart}
        reversed={false}
        onChange={handleLoopStartChange}
      />
      <RangeInput
        name="loopEnd"
        label='STOP'
        min={0}
        max={store.duration}
        value={store.loopEnd}
        reversed={true}
        onChange={handleLoopEndChange}
      />
    </ BoxWrapper>
  )
}
