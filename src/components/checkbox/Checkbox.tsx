import { Box } from 'components';
import * as bi from 'react-bootstrap-icons';
import './style.scss';
import { createClassName } from 'common/helpers';

interface IProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  children?: React.ReactNode;
  size?: 'small' | 'default';
}

function Checkbox(props: IProps) {
  const className = createClassName('cb-NrJs', props.size === 'default' ? 'def-kd5a' : null);

  return (
    <div
      className={className}
      onClick={() => props.onChange?.(!props.checked)}
    >
      <Box
        variant='darker'
        shadow='inside'
        className='cb-ch-Ntud'
      >
        {props.checked && <bi.Check />}
      </Box>
      <span>{props.children}</span>
    </div>
  );
}

export default Checkbox;
