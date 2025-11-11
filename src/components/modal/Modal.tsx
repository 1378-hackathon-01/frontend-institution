import { useEffect } from 'react';
import { ModalContent, ModalHeader, ModalOverlay } from './components';
import { ModalColor, ModalSize } from './types';
import { BackService } from 'shared/services';

interface IModalProps {
  size?: ModalSize;
  header?: React.ReactNode;
  children?: React.ReactNode;
  color?: ModalColor;
  onClose?: () => void;
}

function Modal(props: IModalProps) {
  useEffect(() => {
    if (props.onClose != null) {
      BackService.getInstance().push(props.onClose);
    }
  }, [props.onClose]);

  const handleClose = () => {
    const callback = BackService.getInstance().pop(true);
    callback?.();
  };

  return (
    <ModalOverlay>
      <ModalContent
        size={props.size}
        header={props.header}
        onClose={props.onClose != null ? handleClose : undefined}
        color={props.color}
      >
        {(props.header != null || props.onClose != null) && (
          <ModalHeader
            header={props.header}
            onClose={props.onClose != null ? handleClose : undefined}
          />
        )}
        {props.children}
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;
