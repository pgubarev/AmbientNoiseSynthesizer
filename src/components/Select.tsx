import styled from 'styled-components';

import { palette } from '../theme';

const StyledSelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  select {
      width: 200px;
      border: none;
      background-color: ${palette.light.light1};
  }

  option:selected {
    background-color: ${palette.frost.paleBlue};
  }
`;

export function Select(props: {
  name: string,
  label: string,
  value: string,
  onChange: ChangeEventHandler,
  options: string[],
}) {
  return (
    <StyledSelectContainer>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        value={props.value}
      >
        { props.options.map(option => <option key={option} value={option}>{option}</option>) }
      </select>
    </StyledSelectContainer>
  )
}
