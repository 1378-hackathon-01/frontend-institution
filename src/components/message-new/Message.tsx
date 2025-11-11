import * as bi from 'react-bootstrap-icons';
import { createClassName } from 'common/helpers';
import { Flex } from 'components';
import './style.scss';

type MessageType = 'info' | 'warning' | 'error' | 'success';

interface IProps {
  type: MessageType;
  title?: React.ReactNode | null;
  children?: React.ReactNode | React.ReactNode[];
}

function Message(props: IProps) {
  const className = createClassName('msg-nzf6', getMessageTypeClassName(props.type));

  return (
    <Flex
      className={className}
      direction='column'
      gap={10}
    >
      {props.title && (
        <header className='title-asxg'>
          {getTitleIcon(props.type)}
          <span>{props.title}</span>
        </header>
      )}

      <div className='cnt-ne9z'>{props.children}</div>
    </Flex>
  );
}

function getMessageTypeClassName(type: MessageType): string | null {
  if (type === 'info') {
    return 'msg-i-6gp';
  }

  if (type === 'warning') {
    return 'msg-w-efj';
  }

  if (type === 'error') {
    return 'msg-e-w1m';
  }

  if (type === 'success') {
    return 'msg-s-rjgm';
  }

  return null;
}

function getTitleIcon(type: MessageType): React.ReactNode {
  if (type === 'info') {
    return <bi.InfoCircleFill />;
  }

  if (type === 'warning') {
    return <bi.ExclamationDiamondFill />;
  }

  if (type === 'error') {
    return <bi.ExclamationSquareFill />;
  }

  if (type === 'success') {
    return <bi.CheckCircleFill />;
  }

  return <bi.QuestionCircleFill />;
}

export default Message;
