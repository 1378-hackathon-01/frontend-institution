import * as bi from 'react-bootstrap-icons';
import { createClassName } from 'common/helpers';
import { Box } from 'components';
import './style.scss';

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  label?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

function Select(props: IProps) {
  const className = createClassName('select-P6sk', props.icon != null ? 'iconed-fC7R' : null);

  return (
    <div className='select-box-TaOg'>
      {props.label != null && <div className='label-dmno'>{props.label}</div>}
      <Box
        variant='darker'
        shadow='inside'
      >
        <div className='select-container-Slxr'>
          {props.icon != null && <div className='icon-y4Pi'>{props.icon}</div>}
          <div className='chevron-icon-hYbC'>
            <bi.ChevronDown />
          </div>
          <select
            className={className}
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
          >
            {props.children}
          </select>
        </div>
      </Box>
    </div>
  );
}

export default Select;
