import { useCallback, SyntheticEvent } from 'react';

import { BoxWrapper } from '../components';
import { useSampleFileStore } from '../stores';

export function Uploader() {
  const store = useSampleFileStore();

  const handleFileUploaded = useCallback((event: SyntheticEvent) => {
    console.log('file uploaded');
    // @ts-ignore
    store.setFile(event.target.value ? event.target.files[0] as File : null);
  }, []);

  return (
    <BoxWrapper>
      <h1>SAMPLE</h1>
      <div>
        <input
          id='sample-input'
          name='sample-input'
          type='file'
          accept="audio/mpeg,audio/flac,audio/wav"
          onChange={handleFileUploaded}
        />
      </div>
    </BoxWrapper>
  )
}
