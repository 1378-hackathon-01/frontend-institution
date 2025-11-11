import { useRef } from 'react';
import { Box } from 'components';
import { useOutsideClickHandler } from 'common/hooks';
import { ModalColor, ModalSize } from '../../types';
import './style.scss';

interface IProps {
  header?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  size?: ModalSize;
  color?: ModalColor;
  onClose?: () => void;
}

function ModalContent(props: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClickHandler(ref, props.onClose);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose?.();
    }
  };

  return (
    <Box
      padding={20}
      ref={ref}
      onKeyDown={handleKeyDown}
      className={propsToClass(props)}
      variant={props.color}
    >
      {props.children}
    </Box>
  );
}

function propsSizeToClass(size?: ModalSize): string | null {
  if (size == null) {
    return null;
  }

  if (size === 'fullscreen') {
    return 'm-f-4qa3';
  }

  if (size === 400) {
    return 'm-400-U5us';
  }

  throw new Error('Unexpected modal size!');
}

function propsToClass(props: IProps): string {
  const parts: (string | null)[] = ['m-cnt-U5yq'];
  parts.push(propsSizeToClass(props.size));
  return parts.filter((x) => x != null).join(' ');
}

export default ModalContent;
