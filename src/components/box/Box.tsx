import { ForwardedRef, forwardRef } from 'react';
import './style.scss';

type BoxVariant = 'lighter' | 'darker' | 'loading';
type BoxPadding = 0 | 5 | 10 | 15 | 20;
type BoxShadow = 'outside' | 'inside' | 'none';

interface IProps {
  variant?: BoxVariant;
  padding?: BoxPadding;
  shadow?: BoxShadow;
  children?: React.ReactNode;
  className?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onClick?: () => void;
}

function Box(props: IProps, ref?: ForwardedRef<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      className={createClassName(props)}
      onKeyDown={props.onKeyDown}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
}

function getShadowClassName(shadow: BoxShadow | null | undefined): string | null {
  if (shadow === 'inside') {
    return 'i-5hs';
  }

  if (shadow === 'none') {
    return null;
  }

  return 'o-Bzg';
}

function createClassName(props: IProps): string {
  const parts: (string | null)[] = ['box-yHd'];

  if (props.variant === 'darker') {
    parts.push('d-N4s');
  } else if (props.variant === 'loading') {
    parts.push('lo-pnvq');
  } else {
    parts.push('l-Nhy');
  }

  parts.push(getShadowClassName(props.shadow));

  switch (props.padding) {
    case 5:
      parts.push('p-0-3-Abd');
      break;
    case 10:
      parts.push('p-0-6-Nx2');
      break;
    case 15:
      parts.push('p-1-fkF');
      break;
    case 20:
      parts.push('p-1-25-BAg');
      break;
  }

  if (props.className != null) {
    parts.push(props.className);
  }

  return parts.filter((x) => x != null).join(' ');
}

export default forwardRef(Box);
