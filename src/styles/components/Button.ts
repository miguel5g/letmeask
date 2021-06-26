import styled, { css } from 'styled-components';

const OutlinedButton = css`
  background: ${({ theme }) => theme.colors.whiteDetails};
  border: 1px solid ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.purple};
`;

export const ButtonContainer = styled.button`
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: ${({ theme }) => theme.colors.purple};
  color: #fff;
  padding: 0 32px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  ${({ isOutlined }: { isOutlined: boolean }) =>
    isOutlined ? OutlinedButton : undefined};

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
