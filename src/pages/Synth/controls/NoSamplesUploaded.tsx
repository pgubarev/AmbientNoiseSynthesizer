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
        Загрузка сэмпла
      </TitleText>
      <Text style={{marginTop: '10px'}}>
        Вначале загрузите сэмпл. Можно использовать mp3 или wave формат.<br/>
        Сэмпл будет обработан эквалайзером для создания нового звука.<br/>
        Обработка производится прямо в браузере, файл не будет загружен куда либо еще.
      </Text>
      <LabelBlueButton htmlFor='sample-input'>Загрузить</LabelBlueButton>
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
