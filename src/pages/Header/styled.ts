import styled from 'styled-components';

import { palette } from '../../theme';

export const HeaderContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderLinksContainer = styled.div`
    width: 800px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: ${palette.frost.paleBlue};
    border-style: solid;
    border-width: 1px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
`;

export const LinkButton = styled.a<{isActive?: boolean}>`
    text-decoration: none;
    color: ${props => props.isActive ? palette.frost.deepBlue : palette.dark.dark4};
    font-weight: bold;
    font-size: 24px;
    padding: 20px;
    
    &:hover {
        cursor: pointer;
        text-decoration: underline;
        color: ${palette.frost.paleBlue};
    }
`;
