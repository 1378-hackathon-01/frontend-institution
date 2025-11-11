import { useEffect } from 'react';
import './style.scss';

interface IProps {
  title: string;
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
}

function Page(props: IProps) {
  useEffect(() => {
    document.title = `${props.title} - Учебное заведение`;
  }, [props.title]);

  return <div className={getClassName(props)}>{props.children}</div>;
}

function getClassName(props: IProps): string {
  const parts = ['page-Ndhw'];

  if (props.className != null) {
    parts.push(props.className);
  }

  return parts.join(' ');
}

export default Page;
