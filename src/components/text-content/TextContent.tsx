import { createElement } from 'react';
import './style.scss';

type TextAlign = 'left' | 'center' | 'right';

interface IProps {
  align?: TextAlign;
  element?: 'div' | 'span' | 'p';
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

function TextContent(props: IProps) {
  const className = createClassName(props);
  return createElement(props.element ?? 'div', { className: className }, props.children);
}

function createClassName(props: IProps): string {
  const parts: (string | null)[] = ['text-b2hh'];
  parts.push(createClassNameAlign(props.align));
  parts.push(props.className ?? null);
  return parts.filter((x) => x != null).join(' ');
}

function createClassNameAlign(align: TextAlign | null | undefined): string | null {
  if (align === 'left') {
    return 't-l-5e3j9';
  }

  if (align === 'center') {
    return 't-c-l3vmn';
  }

  if (align === 'right') {
    return 't-r-qi12d';
  }

  return null;
}

export default TextContent;
