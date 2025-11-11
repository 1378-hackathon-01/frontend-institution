import * as bi from 'react-bootstrap-icons';
import { Button, Flex, Input } from 'components';
import { useState } from 'react';
import { handleEnterButton } from 'common/handlers';

interface IProps {
  onEnterClick?: (login: string, password: string) => void;
}

function StageDefault(props: IProps) {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isAllowed = login.trim().length > 3 && password.trim().length > 3;

  const handleEnterClick = () => {
    if (isAllowed) {
      props.onEnterClick?.(login, password);
    }
  };

  return (
    <Flex
      direction='column'
      gap={20}
    >
      <Flex
        direction='column'
        gap={10}
      >
        <Input
          type='text'
          label='Логин'
          placeholder='username'
          icon={<bi.Person />}
          value={login}
          onInput={setLogin}
          onKeyUp={(e) => handleEnterButton(e, handleEnterClick)}
        />

        <Input
          type='password'
          label='Пароль'
          placeholder='password'
          icon={<bi.Key />}
          value={password}
          onInput={setPassword}
          onKeyUp={(e) => handleEnterButton(e, handleEnterClick)}
        />
      </Flex>

      <Button
        disabled={!isAllowed}
        onClick={handleEnterClick}
      >
        <Flex
          justifyContent='center'
          alignItems='center'
          gap={5}
        >
          <bi.Lock />
          <span>Войти</span>
        </Flex>
      </Button>
    </Flex>
  );
}

export default StageDefault;
