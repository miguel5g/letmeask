import styled from 'styled-components';

export const RoomContainer = styled.div`
  main {
    max-width: 800px;
    margin: 0 auto;

    > div:first-child {
      margin: 32px 0 24px;
      display: flex;
      align-items: center;

      h1 {
        font-family: 'Poppins', sans-serif;
        font-size: 24px;
        color: ${({ theme }) => theme.colors.black};
      }

      span {
        margin-left: 16px;
        background: ${({ theme }) => theme.colors.pinkDark};
        border-radius: 9999px;
        padding: 8px 16px;
        color: #fff;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
`;

export const HeaderContainer = styled.header`
  padding: 24px;
  border-bottom: 1px solid
    ${({ theme }) => (theme.title === 'light' ? '#E3E3E3' : '#1C1C1C')};

  > div {
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > img {
      max-height: 45px;
    }

    > div {
      display: flex;
      gap: 16px;

      button {
        height: 40px;
      }
    }
  }
`;

export const QuestionList = styled.div`
  margin: 32px 0;
`;

export const FormContainer = styled.form`
  textarea {
    width: 100%;
    border: 0;
    padding: 16px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.whiteDetails};
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
    resize: vertical;
    min-height: 130px;
    color: ${({ theme }) => theme.colors.black};
  }

  > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    > div {
      display: flex;
      align-items: center;

      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }

      span {
        margin-left: 8px;
        color: ${({ theme }) => theme.colors.black};
        font-weight: 500;
        font-size: 14px;
      }
    }

    > span {
      font-size: 14px;
      color: ${({ theme }) => theme.colors.grayDark};
      font-weight: 500;

      button {
        background: transparent;
        border: 0;
        color: ${({ theme }) => theme.colors.purple};
        text-decoration: underline;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;

export const IconButton = styled.button<{ hoverColor?: string }>`
  border: 0;
  background: transparent;
  cursor: pointer;
  transition: filter 0.2s;
  color: ${({ theme, color }) => color || theme.colors.grayDark};
  display: flex;
  align-items: flex-end;
  gap: 8px;

  &:hover {
    color: ${({ hoverColor }) => hoverColor};
    filter: brightness(0.7);
  }
`;
