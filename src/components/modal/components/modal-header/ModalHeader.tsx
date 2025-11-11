import { Button, Header } from 'components';
import * as bi from 'react-bootstrap-icons';
import './style.scss';

interface IProps {
  header?: React.ReactNode;
  onClose?: () => void;
}

function ModalHeader(props: IProps) {
  return (
    <div className='m-cnt-h-U5ysx'>
      {props.onClose != null && (
        <Button
          className='m-cnt-h-x hidden-4Ar1'
          color='01-transparent'
          onClick={props.onClose}
        >
          <bi.XLg />
        </Button>
      )}
      <div className='m-cnt-h-cnt-U4u'>
        <Header size='default'>{props.header}</Header>
      </div>
      {props.onClose != null && (
        <Button
          className='m-cnt-h-x'
          color='01-transparent'
          onClick={props.onClose}
        >
          <bi.XLg />
        </Button>
      )}
    </div>
  );
}

export default ModalHeader;
