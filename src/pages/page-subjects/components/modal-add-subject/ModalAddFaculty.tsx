import { useState } from 'react';
import { Button, Flex, Input, Loader, Message, Modal } from 'components';
import { handleError, handleErrorAuth } from 'common/handlers';
import { ApiSubjects } from 'common/api';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  onClose: () => void;
}

function ModalAddSubject(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');
  const [title, setTitle] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');

  const isValid = title.trim().length > 4 && abbreviation.trim().length > 1;

  const handleAddClick = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          setStage('loading');

          await ApiSubjects.getInstance().create({
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
      header='Добавление дисциплины'
    >
      {stage === 'success' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Message
            type='success'
            title='Дисциплина успешно добавлена'
          >
            <p>Вы успешно добавили дисциплину в сервис!</p>
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
              placeholder='СППР'
              value={abbreviation}
              onInput={setAbbreviation}
            />

            <Input
              type='text'
              label='Полное название'
              placeholder='Системы поддержки принятия решений'
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

export default ModalAddSubject;
