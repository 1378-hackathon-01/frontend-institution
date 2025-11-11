import * as bi from 'react-bootstrap-icons';
import './style.scss';

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
}

function Tooltip(props: IProps) {
  return (
    <div className='tip-YwyH'>
      <div className='icon-23Sk'>
        <bi.QuestionCircle />
      </div>
      <div className='content-XdGn'>{props.children}</div>
    </div>
  );
}

export default Tooltip;
