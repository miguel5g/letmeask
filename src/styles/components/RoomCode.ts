import styled from 'styled-components';

export const RoomCodeButtonContainer = styled.button`
  height: 40px;
  border-radius: 8px;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.whiteDetails};
  border: 1px solid ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};

  display: flex;

  div {
    background: ${({ theme }) => theme.colors.purple};
    padding: 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 16px 0 12px;
    font-size: 14px;
    font-weight: 500;
  }
`;
