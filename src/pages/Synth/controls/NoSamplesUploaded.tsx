import { SyntheticEvent, useCallback } from 'react';

import { Column, LabelBlueButton, Text, TitleText } from '../../../components';
import { useSampleFileStore } from '../../../stores';

export function NoSamplesUploaded() {
  const store = useSampleFileStore();

  const handleFileUploaded = useCallback((event: SyntheticEvent) => {
    // @ts-expect-error: stupid event typing
    store.setFile(event.target.value ? event.target.files[0] as File : null);
  }, []);

  return (
    <Column style={{alignItems: 'center'}}>
      <TitleText>
        Upload sample
      </TitleText>
      <Text style={{marginTop: '10px'}}>
        Upload audio sample of ambient sound. You could use mp3 or wave format.<br/>
        Sample will be processed with equalizers and gain filters to create new sound.<br/>
        Don't worry, file won't be uploaded to any server, just processed in browser.
      </Text>
      <LabelBlueButton htmlFor='sample-input'>Upload</LabelBlueButton>
      <input
        type='file'
        id='sample-input'
        name='sample-input'
        style={{'display': 'none'}}
        accept='audio/mpeg,audio/flac,audio/wav'
        onChange={handleFileUploaded}
      />
    </Column>
  )
}
