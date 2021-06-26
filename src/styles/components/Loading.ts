import styled from 'styled-components';
import { transparentize } from 'polished';

export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  background: ${({ theme }) =>
    transparentize(0.04, theme.colors.whiteBackground)};

  display: flex;
  justify-content: center;
  align-items: center;
`;
