import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;

  aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 7;

    padding: 8rem 5.33rem;

    background: ${({ theme }) => theme.colors.purple};

    color: #fff;

    img {
      max-width: 320px;
    }

    strong {
      margin-top: 16px;

      font: 700 2.44rem 'Poppins', sans-serif;
      line-height: 2.8rem;
    }

    p {
      margin-top: 1.07rem;

      color: #fff;
      font-size: 1.6rem;
      line-height: 2.13rem;
    }
  }

  @media (max-width: 960px) {
    flex-direction: column-reverse;
    justify-content: flex-end;

    aside {
      align-items: center;

      padding: 1.73rem;

      img {
        max-height: 192px;
      }

      strong {
        font-size: 1.87rem;
        text-align: center;
      }

      p {
        font-size: 1.2rem;
        text-align: center;
      }
    }
  }
`;

export const MainContainer = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 8;

  padding: 2.13rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 100%;
    max-width: 320px;

    text-align: center;

    > img {
      align-self: center;
    }

    h2 {
      margin: 64px 0 24px;

      font-size: 24px;
      font-family: 'Poppins', sans-serif;
    }

    form {
      input {
        height: 50px;
        padding: 0 16px;

        background: #fff;
        border: 1px solid ${({ theme }) => theme.colors.grayMedium};
        border-radius: 8px;
      }

      button {
        margin-top: 16px;
      }

      button,
      input {
        width: 100%;
      }
    }

    p {
      margin-top: 16px;

      color: ${({ theme }) => theme.colors.grayDark};
      font-size: 14px;

      a {
        color: ${({ theme }) => theme.colors.pinkDark};
      }
    }
  }

  @media (max-width: 960px) {
    flex: 0;
  }
`;

export const CreateRoomButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  margin-top: 64px;

  border-radius: 8px;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.grayMedium};

  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;

  cursor: pointer;
  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;

  margin: 32px 0;

  color: ${({ theme }) => theme.colors.grayMedium};
  font-size: 14px;

  &::before {
    content: '';

    flex: 1;

    height: 1px;
    margin-right: 16px;

    background: ${({ theme }) => theme.colors.grayMedium};
  }

  &::after {
    content: '';

    flex: 1;

    height: 1px;
    margin-left: 16px;

    background: ${({ theme }) => theme.colors.grayMedium};
  }
`;
