import { useCallback } from 'react';

import { BoxWrapper, RangeInput, TitleText } from '../../../../components';
import { useSampleParamsStore } from '../../../../stores';

import { StyledCanvasContainer } from './styled.ts';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { useDrawLoop } from './drawing';

export function LoopParams() {
  const store = useSampleParamsStore();
  const canvasRefs = useDrawLoop();

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
      <TitleText>LOOP</TitleText>

      <div>
        <RangeInput
          name='loopStart'
          min={0}
          max={store.duration}
          value={store.loopStart}
          reversed={false}
          onChange={handleLoopStartChange}
          width={CANVAS_WIDTH}
        />
        <StyledCanvasContainer>
          <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRefs.frontCanvasRef} style={{position: 'absolute'}}/>
          <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRefs.canvasRef} style={{position: 'absolute'}}/>
        </StyledCanvasContainer>
        <RangeInput
          name='loopEnd'
          min={0}
          max={store.duration}
          value={store.loopEnd}
          reversed={true}
          onChange={handleLoopEndChange}
          width={CANVAS_WIDTH}
        />
      </div>
    </ BoxWrapper>
  )
}
