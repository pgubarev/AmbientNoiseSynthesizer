import styled from 'styled-components';

import { palette } from '../theme';

export const Text = styled.p`
    color: ${palette.dark.dark4};
    font-size: 16px;
    font-weight: 300;
    padding: 0;
    margin: 0;
`;

export const TitleText = styled.p`
    color: ${palette.dark.dark4};
    font-size: 20px;
    font-weight: 600;
    padding: 0;
    margin: 0;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`;

export const LabelBlueButton = styled.label`
    width: 250px;
    height: 60px;
    border: none;
    background-color: ${palette.frost.paleBlue};
    color: ${palette.light.light3};
    font-size: 24px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: ${palette.frost.deepBlue};
    }
`;