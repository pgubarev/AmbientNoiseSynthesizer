import { useCallback, SyntheticEvent } from 'react';

import { BoxWrapper, LabelBlueButton } from '../../../components';
import { useSampleFileStore } from '../../../stores';

export function SampleController() {
  const store = useSampleFileStore();

  const handleFileUploaded = useCallback((event: SyntheticEvent) => {
    // @ts-expect-error: stupid event typing
    store.setFile(event.target.value ? event.target.files[0] as File : null);
  }, []);

  return (
    <BoxWrapper>
      <h1>SAMPLE</h1>
      <span>
        <b>file</b>: {store.file?.name}
      </span>
      <div>
        <LabelBlueButton htmlFor='sample-input'>Upload</LabelBlueButton>
        <input
          type='file'
          id='sample-input'
          name='sample-input'
          style={{'display': 'none'}}
          accept='audio/mpeg,audio/flac,audio/wav'
          onChange={handleFileUploaded}
        />
      </div>
    </BoxWrapper>
  )
}
