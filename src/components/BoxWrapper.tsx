import styled from 'styled-components';

import { palette } from '../theme';

export const BoxWrapper = styled.div`
  border: 2px dashed;
  border-radius: 25px;
  border-color: ${palette.frost.paleBlue};
  padding: 20px;
  width: max-content;

  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
`;
