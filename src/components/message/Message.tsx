import * as bi from 'react-bootstrap-icons';
import './style.scss';

type MessageType = 'success' | 'warning' | 'error' | 'info' | 'accent-01';

interface IProps {
  type: MessageType;
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

function Message(props: IProps) {
  return (
    <div className={getClassName(props)}>
      {props.title != null && (
        <header>
          {props.icon ?? getIcon(props.type)}
          <b>{props.title}</b>
        </header>
      )}
      {props.children}
    </div>
  );
}

function getClassName(props: IProps) {
  const parts = ['msg-A2Ehd'];
  parts.push(getColorClassName(props.type));

  if (props.className != null) {
    parts.push(props.className);
  }

  return parts.join(' ');
}

function getIcon(type: MessageType): React.ReactNode {
  if (type === 'info') {
    return <bi.InfoCircle />;
  }

  if (type === 'success') {
    return <bi.Check2Circle />;
  }

  if (type === 'warning') {
    return <bi.ExclamationDiamond />;
  }

  if (type === 'error') {
    return <bi.XOctagon />;
  }

  if (type === 'accent-01') {
    return <bi.Flag />;
  }

  throw new Error('Unexpected message type.');
}

function getColorClassName(type: MessageType): string {
  if (type === 'info') {
    return 'i-Z2as';
  }

  if (type === 'success') {
    return 's-uY3sa';
  }

  if (type === 'warning') {
    return 'w-WnSa';
  }

  if (type === 'error') {
    return 'e-Bh374';
  }

  if (type === 'accent-01') {
    return 'a-01-i648';
  }

  throw new Error('Unexpected message type.');
}

export default Message;
