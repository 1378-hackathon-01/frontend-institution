import './style.scss';

type FlexAlign = 'center' | 'flex-end';
type FlexJustifyContent = 'center' | 'space-between' | 'flex-end';
type FlexDirection = 'column' | 'column-reverse' | 'row' | 'row-reverse';
type FlexGap = 0 | 5 | 10 | 20 | 40;

interface IProps {
  direction?: FlexDirection;
  gap?: FlexGap;
  style?: React.CSSProperties;
  className?: string;
  justifyContent?: FlexJustifyContent;
  alignItems?: FlexAlign;
  children?: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  'aria-disabled'?: boolean;
  tabIndex?: number;
  role?: string;
}

function Flex(props: IProps) {
  return (
    <div
      className={getClassName(props)}
      style={props.style}
      onClick={props.onClick}
      aria-disabled={props['aria-disabled']}
      tabIndex={props.tabIndex}
      role={props.role}
    >
      {props.children}
    </div>
  );
}

function getGapClassName(gap: FlexGap | undefined | null): string | null {
  if (gap == null) {
    return null;
  }

  if (gap === 0) {
    return 'fl-g-0';
  }

  if (gap === 5) {
    return 'fl-g-5';
  }

  if (gap === 10) {
    return 'fl-g-10';
  }

  if (gap === 20) {
    return 'fl-g-20';
  }

  if (gap === 40) {
    return 'fl-g-40';
  }

  throw new Error(`Unexpected flex gap: ${gap}`);
}

function getDirectionClassName(direction: FlexDirection | undefined | null): string | null {
  if (direction == null) {
    return null;
  }

  if (direction === 'column') {
    return 'fl-c';
  }

  if (direction === 'column-reverse') {
    return 'fl-cr';
  }

  if (direction === 'row') {
    return 'fl-r';
  }

  if (direction === 'row-reverse') {
    return 'fl-rr';
  }

  throw new Error(`Unexpected flex direction: ${direction}`);
}

function getJustifyContentClassName(justifyContent: FlexJustifyContent | undefined | null): string | null {
  if (justifyContent == null) {
    return null;
  }

  if (justifyContent === 'center') {
    return 'fl-jc-c';
  }

  if (justifyContent === 'space-between') {
    return 'fl-jc-sb';
  }

  if (justifyContent === 'flex-end') {
    return 'fl-jc-fe';
  }

  throw new Error(`Unexpected flex justify content: ${justifyContent}`);
}

function getAlignItemsClassName(alignItems: FlexAlign | undefined | null): string | null {
  if (alignItems == null) {
    return null;
  }

  if (alignItems === 'center') {
    return 'fl-ai-c';
  }

  if (alignItems === 'flex-end') {
    return 'fl-ai-fe';
  }

  throw new Error(`Unexpected flex align items: ${alignItems}`);
}

function getClassName(props: IProps): string {
  const parts: (string | null)[] = ['fl'];
  parts.push(getDirectionClassName(props.direction));
  parts.push(getGapClassName(props.gap));
  parts.push(getJustifyContentClassName(props.justifyContent));
  parts.push(getAlignItemsClassName(props.alignItems));
  parts.push(props.className || null);
  return parts.filter((x) => x != null).join(' ');
}

export default Flex;
