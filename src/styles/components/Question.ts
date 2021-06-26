import styled, { css } from 'styled-components';

type QuestionProps = {
  isHighlighted: boolean;
  isAnswered: boolean;
};

const AnsweredQuestion = css`
  opacity: 0.5;
`;

const HighlightedQuestion = css`
  background: ${({ theme }) => theme.colors.whiteDetails};
  border: 1px solid ${({ theme }) => theme.colors.purple};

  footer .user-info span {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const QuestionContainer = styled.div<QuestionProps>`
  background: ${({ theme }) => theme.colors.whiteDetails};
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 24px;

  & + & {
    margin-top: 8px;
  }

  ${({ isAnswered }) => (isAnswered ? AnsweredQuestion : undefined)};
  ${({ isAnswered, isHighlighted }) =>
    isHighlighted && !isAnswered ? HighlightedQuestion : undefined};

  p {
    color: ${({ theme }) => theme.colors.black};
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    > div {
      display: flex;
      gap: 16px;
    }

    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  span {
    margin-left: 8px;
    color: ${({ theme }) => theme.colors.grayDark};
    font-size: 14px;
  }
`;
