import styled from 'styled-components';
import { ChangeEventHandler } from 'react';

import { palette } from '../theme';


const StyledRangeInputContainer = styled.div<{
  $reversed: boolean;
  $percents: number;
  $componentWidth?: number;
  $componentHeight?: number;
}>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  input[type='range'] {
    width: ${ props => props.$componentWidth ? props.$componentWidth + 'px' : '500px' };
    height: ${ props => props.$componentHeight ? props.$componentHeight + 'px' : '15px' };

    overflow: hidden;
    -webkit-appearance: none;
    background-color: ${palette.light.light1};
    outline: none;
    margin: 0;

    background: ${props => {
      const firstColor = !props.$reversed ? palette.frost.paleBlue : palette.light.light1;
      const secondColor = !props.$reversed ? palette.light.light1 : palette.frost.paleBlue;

      return `linear-gradient(to right, ${firstColor} 0%, ${firstColor} ${props.$percents}%, ${secondColor} ${props.$percents}%, ${secondColor} 100%);`;
    }}
  }

  input[type='range']::-webkit-slider-thumb {
    width: 20px;
    -webkit-appearance: none;
    height: 25px;
    background: ${palette.frost.deepBlue};
    border-radius: 2px;
  }
`;

export function RangeInput(
  props: {
    name: string,
    label?: string,
    value: number,
    min: number,
    max: number,
    step?: number,
    reversed?: boolean,
    onChange: ChangeEventHandler,
    width?: number;
    height?: number;
  }) {
  return (
    <StyledRangeInputContainer
      $percents={props.value / props.max * 100}
      $reversed={!!props.reversed}
      $componentWidth={props.width}
      $componentHeight={props.height}
    >
      { props.label && <label htmlFor={props.name}>{props.label}</label> }
      <input
        name={props.name}
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        step={props.step ?? 0.01}
        onChange={props.onChange}
      />
    </StyledRangeInputContainer>
  )
}
