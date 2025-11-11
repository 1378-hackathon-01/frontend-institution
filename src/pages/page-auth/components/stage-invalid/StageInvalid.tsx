import * as bi from 'react-bootstrap-icons';
import { Button, Flex, Message } from 'components';
import './style.scss';

interface IProps {
  onBackClick: () => void;
}

function StageInvalid(props: IProps) {
  return (
    <Flex
      direction='column'
      gap={10}
    >
      <Message
        type='error'
        title='Ошибка!'
      >
        <Flex direction='column'>
          <Flex
            alignItems='center'
            justifyContent='center'
            className='err-11oi'
          >
            <bi.XCircle />
          </Flex>
          <p>Аккаунт с указанным логином и паролем не найден!</p>
        </Flex>
      </Message>

      <Button
        color='01'
        onClick={props.onBackClick}
      >
        Назад
      </Button>
    </Flex>
  );
}

export default StageInvalid;
