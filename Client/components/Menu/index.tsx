import { CloseModalButton, CreateMenu } from '@components/Menu/style';
import React, { FC, CSSProperties, useCallback } from 'react';

interface Prop {
  show: boolean;
  onCloseModal: (e: any) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Prop> = ({ children, style, show, onCloseModal, closeButton }) => {
  const stopPropagaition = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <CreateMenu onClick={onCloseModal}>
      <div onClick={stopPropagaition} style={style}>
        {closeButton && <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
        {children}
      </div>
    </CreateMenu>
  );
};

Menu.defaultProps = {
  closeButton: true,
};

export default Menu;
