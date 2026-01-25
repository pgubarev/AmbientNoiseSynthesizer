import { Column, Row } from '../../components';
import { NoSamplesUploaded, LoopParams, Keyboard, NoteParams, SampleController, OscillatorParams } from './controls';
import { useSampleParamsStore } from '../../stores';
import { Processor } from '../../Processor';

export function SynthPage() {
  const store = useSampleParamsStore();

  return (
    <>
      <Processor />
        { !store.duration && <NoSamplesUploaded /> }
        { !!store.duration && (
          <Column>
            <Row>
              <SampleController />
              <LoopParams />
            </Row>
            <Row>
              <NoteParams />
            </Row>
            <Row>
              <OscillatorParams />
            </Row>
            <Row style={{flexGrow: 2}}>
              <Keyboard />
            </Row>
          </Column>
        )}
    </>
  )
}
