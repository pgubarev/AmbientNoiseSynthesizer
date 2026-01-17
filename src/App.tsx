import styled from 'styled-components';

import { Header, SynthPage } from './pages';
import { usePagesStore } from './stores';

const StyledPageContentWrapper = styled.div`
    width: max-content;
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
        {store.currentPage === 'HowItWorks' && <>how it works</>}
        {store.currentPage === 'About' && <>about</>}
      </StyledPageContentWrapper>
    </>
  )
}

export default App
