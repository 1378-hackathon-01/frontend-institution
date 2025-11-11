import { ILoaderProps } from '../../types';
import './style.scss';

function LineLoader(props: ILoaderProps) {
  const className = createClassNameFromProps(props);
  return <div className={className} />;
}

function propsColorToClassName(props: ILoaderProps): string {
  if (props.color === '01') {
    return 'lcr-6Q13';
  }

  if (props.color === '02') {
    return 'lcb-t4TY';
  }

  if (props.color === 'background-01') {
    return 'lcb01-75Hw';
  }

  if (props.color === 'background-02') {
    return 'lcb02-6U3H';
  }

  throw new Error('Unexpected loader color!');
}

function propsSizeToClassName(props: ILoaderProps): string {
  if (props.size === 'small') {
    return 'lss-Nhr6';
  }

  if (props.size === 'default') {
    return 'lsd-Vfar';
  }

  throw new Error('Unexpected loader size!');
}

function createClassNameFromProps(props: ILoaderProps): string {
  const parts = ['load-l-Yrh'];
  parts.push(propsColorToClassName(props));
  parts.push(propsSizeToClassName(props));
  return parts.join(' ');
}

export default LineLoader;
