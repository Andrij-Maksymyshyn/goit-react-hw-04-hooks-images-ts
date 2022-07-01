import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalBox } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root') as HTMLElement;

interface IProps {
  onClose: (largeImg?: string, tags?: string) => void,
  children?: React.ReactNode,
};

function Modal({ onClose, children }: IProps) {
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  

  const handleOverlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalBox>{children}</ModalBox>
    </Overlay>,
    modalRoot,
  );
}

export default Modal;


