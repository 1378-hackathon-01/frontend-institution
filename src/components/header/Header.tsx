import { createElement } from 'react';
import './style.scss';

type HeaderElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
type HeaderTextAlign = 'left' | 'center' | 'right';
type HeaderFontSize = 'default' | 'bigger' | 'big';

interface IProps {
  element?: HeaderElement;
  align?: HeaderTextAlign;
  size?: HeaderFontSize;
  children?: React.ReactNode;
  className?: string;
}

function Header(props: IProps) {
  const className = createClassName(props);
  const elementType = getElementType(props.element);
  return createElement(elementType, { className: className }, props.children);
}

function getElementType(level: HeaderElement | undefined): string {
  switch (level) {
    case null:
    case undefined:
    case 'div':
      return 'div';

    case 'span':
      return 'span';

    case 'h1':
      return 'h1';

    case 'h2':
      return 'h2';

    case 'h3':
      return 'h3';

    case 'h4':
      return 'h4';

    case 'h5':
      return 'h5';

    case 'h6':
      return 'h6';

    default:
      throw new Error('Unexpected Element Type: ' + level);
  }
}

function createClassName(props: IProps): string {
  const classNameParts = ['h-7y'];

  switch (props.align) {
    case null:
    case undefined:
      break;

    case 'left':
      classNameParts.push('h-a-l');
      break;

    case 'center':
      classNameParts.push('h-a-c');
      break;

    case 'right':
      classNameParts.push('h-a-r');
      break;

    default:
      throw new Error('Unexpected Header Text Align: ' + props.align);
  }

  switch (props.size) {
    case null:
    case undefined:
      classNameParts.push('h-f-i');
      break;

    case 'default':
      classNameParts.push('h-f-1');
      break;

    case 'bigger':
      classNameParts.push('h-f-1-25');
      break;

    case 'big':
      classNameParts.push('h-f-1-5');
      break;

    default:
      throw new Error('Unexpected Header Text Size: ' + props.size);
  }

  if (props.className != null) {
    classNameParts.push(props.className);
  }

  return classNameParts.join(' ');
}

export default Header;
