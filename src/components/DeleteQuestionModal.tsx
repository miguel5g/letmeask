import React from 'react';
import Modal from 'react-modal';
import { FiTrash } from 'react-icons/fi';

import { useTheme } from '../hooks/useTheme';

type DeleteQuestionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
};

Modal.setAppElement('#root');

export const DeleteQuestionModal: React.FC<DeleteQuestionModalProps> = ({
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
      <FiTrash size={48} color={theme.colors.danger} />
      <strong>Excluir pergunta</strong>
      <span>Tem certeza que você deseja excluir esta pergunta?</span>

      <div>
        <button onClick={onCancel}>Cancelar</button>
        <button onClick={onContinue} className="primary">
          Sim, excluir
        </button>
      </div>
    </Modal>
  );
};
