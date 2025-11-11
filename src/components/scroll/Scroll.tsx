import { forwardRef } from 'react';
import './style.scss';

type ScrollPadding = 3;

interface IProps {
  showBars?: boolean;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  padding?: ScrollPadding;
}

const Scroll = forwardRef((props: IProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className={propsToClass(props)}
      ref={ref}
    >
      <div className='s-cnt-Bea3'>{props.children}</div>
    </div>
  );
});

function propsToClass(props: IProps): string {
  const parts: (string | null)[] = ['s-cntr-D4bs'];

  if (!props.showBars) {
    parts.push('s-cntrs-nb-U23');
  }

  if (props.padding === 3) {
    parts.push('s-pd-3-Masj');
  }

  parts.push(props.className || null);

  return parts.filter((x) => x != null).join(' ');
}

export default Scroll;
