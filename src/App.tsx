import styled from 'styled-components';

import { LoopParams, Keyboard, NoteParams, Uploader } from './controls';
import { useSampleParamsStore } from './stores';
import { Processor } from './Processor';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0px 20px;
`;

function App() {
  const store = useSampleParamsStore();

  return (
    <>
      <Processor />
      <StyledContainer>
      <Uploader />
      { !!store.duration && (
        <>
          <LoopParams />
          <NoteParams />
        </>
      )}

      <Keyboard />
      </StyledContainer>
    </>
  )
}

export default App
