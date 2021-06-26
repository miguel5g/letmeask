import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.whiteBackground};
    color: ${({ theme }) => theme.colors.black};
  }

  body,
  input,
  button,
  textarea {
    font: 400 16px 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  .modal-overlay {
    background: rgba(5, 2, 6, 0.8);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-width: 590px;
    min-height: 362px;
    padding: 64px;

    border-radius: 8px;
    background: ${({ theme }) => theme.colors.whiteBackground};

    > strong {
      margin-top: 24px;

      font-family: Poppins;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }

    > span {
      margin-top: 12px;

      font-family: Roboto;
      font-size: 16px;
      text-align: center;
    }

    > div {
      display: flex;
      gap: 8px;
      
      margin-top: 40px;
      
      button {
        padding: 16px 34px;

        background: ${({ theme }) => theme.colors.grayLight};
        border-radius: 8px;
        border: 0;

        color: ${({ theme }) => theme.colors.grayDark};
        font-family: Roboto;
        font-size: 16px;

        transition: filter 0.2s;

        &.primary {
          background: ${({ theme }) => theme.colors.danger};
          color: #FEFEFE;
        }

        &:not(:disabled):hover {
          filter: brightness(0.9);
        }

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

  :root {
    font-size: 93.75%;
  }
  
  @media (max-width: 960px) {
    :root {
      font-size: 87.5%;
    }
  }
`;
