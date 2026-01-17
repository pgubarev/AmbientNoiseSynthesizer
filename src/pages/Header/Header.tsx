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
          Synthesizer
        </LinkButton>
        <LinkButton isActive={store.currentPage === 'HowItWorks'} onClick={handleHowItWorksClick}>
          How it works
        </LinkButton>
        <LinkButton isActive={store.currentPage === 'About'} onClick={handleAboutClick}>
          Author
        </LinkButton>
      </HeaderLinksContainer>
    </HeaderContainer>
  )
}
