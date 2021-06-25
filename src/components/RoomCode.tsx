import React from 'react';

import copyImg from '../assets/images/copy.svg';

import { RoomCodeButtonContainer } from '../styles/components/RoomCode';

type RoomCodeProps = {
  code: string;
};

export const RoomCode: React.FC<RoomCodeProps> = (props) => {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }

  return (
    <RoomCodeButtonContainer onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </RoomCodeButtonContainer>
  );
};
