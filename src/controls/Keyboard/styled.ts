import styled from 'styled-components';

import { palette } from '../../theme';

export const KeysContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const KeyButton = styled.div<{ $isBlack: boolean; $pressed: boolean; }>`
  height: ${props => props.$isBlack ? '160px' : '200px'};
  width: ${props => props.$isBlack ? '30px': '40px'};
  background-color: ${props => {
    if (props.$isBlack) {
      return props.$pressed ? palette.frost.deepBlue : palette.frost.paleBlue;
    }

    return props.$pressed ? palette.light.light1 : palette.light.light3}
  };
  margin-top: ${props => props.$isBlack ? '0': '20px'};
  margin-left: ${props => props.$isBlack ? '-15px': '0'};
  margin-right: ${props => props.$isBlack ? '-15px': '0'};
  z-index: ${props => props.$isBlack ? '1': '0'};
  border: ${props => props.$isBlack ? 'none': 'solid 1px #000000'};
`;
