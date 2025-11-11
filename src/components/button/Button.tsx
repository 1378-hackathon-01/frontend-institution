import { Link } from 'react-router';
import { createClassName } from 'common/helpers';
import './style.scss';

type ButtonPadding = 5 | 10 | 15;
type ButtonColor = '01' | '01-transparent' | '02' | '02-transparent';
type ButtonFontSize = 'inherit' | 0.9 | 0.8;

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  href?: string;
  fontSize?: ButtonFontSize;
  padding?: ButtonPadding;
  color?: ButtonColor;
  disabled?: boolean;
  className?: string;
}

function Button(props: IProps) {
  const className = createClassName(
    'btn-l2fu',
    getPaddingClassName(props.padding),
    getColorClassName(props.color),
    getFontSizeClassName(props.fontSize),
    getDisabledClassName(props.disabled),
    props.className
  );

  if (props.href) {
    return (
      <Link
        className={className}
        to={props.href}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      disabled={props.disabled}
      className={className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

function getPaddingClassName(padding: ButtonPadding | null | undefined): string | null {
  if (padding === 5) {
    return 'b-p-5-rli';
  }

  if (padding == null || padding === 10) {
    return 'b-p-10-c5b';
  }

  if (padding === 15) {
    return 'b-p-15-ojx';
  }

  return null;
}

function getFontSizeClassName(fontSize: ButtonFontSize | null | undefined): string | null {
  if (fontSize === 'inherit' || fontSize == null) {
    return 'b-fs-i-mub';
  }

  if (fontSize === 0.9) {
    return 'b-fs-09-582';
  }

  if (fontSize === 0.8) {
    return 'b-fs-08-cu8';
  }

  return null;
}

function getColorClassName(color: ButtonColor | null | undefined): string | null {
  if (color == null || color === '01') {
    return 'b-c-01-0nn';
  }

  if (color === '01-transparent') {
    return 'b-c-01-t-41g';
  }

  if (color === '02') {
    return 'b-c-02-0z1';
  }

  if (color === '02-transparent') {
    return 'b-c-02-t-m3e';
  }

  return null;
}

function getDisabledClassName(disabled: boolean | null | undefined): string | null {
  if (disabled) {
    return 'b-d-zdd';
  }

  return null;
}

export default Button;
