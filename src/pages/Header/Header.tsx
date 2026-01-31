import { useCallback } from 'react';
import { LinkButton, HeaderContainer, HeaderLinksContainer } from './styled.ts';
import { usePagesStore } from '../../stores';

export function Header(){
  const store = usePagesStore();

  const handleSynthClick = useCallback(() => store.setCurrentPage('Synth'), [])
  const handleHowItWorksClick = useCallback(() => store.setCurrentPage('HowItWorks'), [])
  const handleAboutClick = useCallback(() => store.setCurrentPage('About'), [])

  return (
    <HeaderContainer>
      <HeaderLinksContainer>
        <LinkButton isActive={store.currentPage === 'Synth'} onClick={handleSynthClick}>
          Синтезатор
        </LinkButton>
        <LinkButton isActive={store.currentPage === 'HowItWorks'} onClick={handleHowItWorksClick}>
          Как это работает
        </LinkButton>
        <LinkButton isActive={store.currentPage === 'About'} onClick={handleAboutClick}>
          Автор
        </LinkButton>
      </HeaderLinksContainer>
    </HeaderContainer>
  )
}
