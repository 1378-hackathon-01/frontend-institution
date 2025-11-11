import { LineLoader } from './components';
import { ILoaderProps } from './types';

interface IProps extends ILoaderProps {
  variant: 'line';
}

function Loader(props: IProps) {
  if (props.variant === 'line') {
    return (
      <LineLoader
        size={props.size}
        color={props.color}
      />
    );
  }

  throw new Error();
}

export default Loader;
