import styled from 'styled-components';

import { Header, SynthPage, HowItWorksPage, AboutPage } from './pages';
import { usePagesStore } from './stores';

const StyledPageContentWrapper = styled.div`
    width: max-conten;
    margin: 50px auto auto auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

function App() {
  const store = usePagesStore();

  return (
    <>
      <Header />
      <StyledPageContentWrapper>
        {store.currentPage === 'Synth' && <SynthPage />}
        {store.currentPage === 'HowItWorks' && <HowItWorksPage />}
        {store.currentPage === 'About' && <AboutPage />}
      </StyledPageContentWrapper>
    </>
  );
}

export default App
