import React from 'react';
import { FiCopy } from 'react-icons/fi';

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
        <FiCopy size={20} />
      </div>
      <span>Sala #{props.code}</span>
    </RoomCodeButtonContainer>
  );
};
