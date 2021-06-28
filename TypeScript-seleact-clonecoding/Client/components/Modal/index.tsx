import { CloseModalButton, CreateMenu } from '@components/Menu/style';
import React, { FC, CSSProperties, useCallback } from 'react';
import { CreateModal } from './style';

interface Prop {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<Prop> = ({ show, onCloseModal, children }) => {
  const stopPropagaition = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagaition}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;
