import { Column, Text, TitleText } from '../../components';

export function AboutPage() {
  return <Column style={{width: '800px'}}>
    <TitleText>
      Павел Губарев - это я
    </TitleText>
    <Text>
      Со мной можно связаться в <a href="https://t.me/pgubarev_dev">telegram</a>, если хотите поболтать
      <br/><br/>
    </Text>
  </Column>;
}
