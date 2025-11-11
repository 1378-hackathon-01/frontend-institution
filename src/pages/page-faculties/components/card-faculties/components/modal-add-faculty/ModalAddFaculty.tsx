import { useState } from 'react';
import { Button, Flex, Input, Loader, Message, Modal } from 'components';
import { handleError, handleErrorAuth } from 'common/handlers';
import { ApiFaculties } from 'common/api';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  onClose: () => void;
}

function ModalAddFaculty(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');
  const [title, setTitle] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');

  const isValid = title.trim().length > 4 || abbreviation.trim().length > 1;

  const handleAddClick = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          setStage('loading');

          await ApiFaculties.getInstance().create({
            title: title.trim(),
            abbreviation: abbreviation.trim(),
          });

          setStage('success');
        })
    );

  return (
    <Modal
      size={400}
      onClose={stage !== 'loading' ? props.onClose : undefined}
      header='Добавление факультета'
    >
      {stage === 'success' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Message
            type='success'
            title='Факультет успешно добавлен'
          >
            <p>Вы успешно добавили факультет в сервис!</p>
          </Message>

          <Button onClick={props.onClose}>Закрыть</Button>
        </Flex>
      )}
      {stage === 'loading' && (
        <Flex
          justifyContent='center'
          alignItems='center'
        >
          <Loader
            variant='line'
            color='01'
            size='default'
          />
        </Flex>
      )}

      {stage === 'default' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Flex
            direction='column'
            gap={5}
          >
            <Input
              type='text'
              label='Аббревиатура'
              placeholder='ФКТИ'
              value={abbreviation}
              onInput={setAbbreviation}
            />

            <Input
              type='text'
              label='Полное название'
              placeholder='Факультет компьютерных технологий и информатики'
              value={title}
              onInput={setTitle}
            />
          </Flex>

          <Flex
            direction='column'
            gap={5}
          >
            <Button
              disabled={!isValid}
              onClick={handleAddClick}
            >
              Добавить
            </Button>
            <Button onClick={props.onClose}>Закрыть</Button>
          </Flex>
        </Flex>
      )}
    </Modal>
  );
}

export default ModalAddFaculty;
