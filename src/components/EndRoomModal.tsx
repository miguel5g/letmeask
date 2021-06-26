import React from 'react';
import Modal from 'react-modal';
import { FiXCircle } from 'react-icons/fi';

import { useTheme } from '../hooks/useTheme';

type EndRoomModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
};

Modal.setAppElement('#root');

export const EndRoomModal: React.FC<EndRoomModalProps> = ({
  isOpen,
  onRequestClose,
  onCancel,
  onContinue,
}) => {
  const { theme } = useTheme();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <FiXCircle size={48} color={theme.colors.danger} />
      <strong>Encerrar sala</strong>
      <span>Tem certeza que você deseja encerrar esta sala?</span>

      <div>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onContinue} className="primary">
          Sim, encerrar
        </button>
      </div>
    </Modal>
  );
};
