import { ApiSubjects } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import { IInstitutionSubjectBrief } from 'common/models';
import { Button, Flex, Loader, Message, Modal } from 'components';
import { useEffect, useState } from 'react';
import './style.scss';

type Stage = 'default' | 'loading' | 'success';

interface IProps {
  facultyId: string;
  groupId: string;
  subject: IInstitutionSubjectBrief;
  onClose: () => void;
}

function ModalEditSubjectContent(props: IProps) {
  const [stage, setStage] = useState<Stage>('loading');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    loadSubject();
  }, []);

  const loadSubject = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          const text = await ApiSubjects.getInstance().getGroupFull(props.facultyId, props.groupId, props.subject.id);

          setText(text.content ?? '');
          setStage('default');
        })
    );

  const handleSaveClick = async () => {
    setStage('loading');

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          await ApiSubjects.getInstance().putGroup(props.facultyId, props.groupId, props.subject.id, {
            content: text,
          });

          setStage('success');
        })
    );
  };

  return (
    <Modal
      size={400}
      header='Изменение текста'
      onClose={props.onClose}
    >
      {stage === 'loading' && (
        <Flex
          direction='column'
          gap={40}
        >
          <Flex justifyContent='center'>
            <Loader
              variant='line'
              size='default'
              color='01'
            />
          </Flex>

          <Message
            type='warning'
            title='Загрузка'
          >
            Дождитесь загрузки данных...
          </Message>
        </Flex>
      )}

      {stage === 'success' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Message
            type='success'
            title='Успех!'
          >
            Содержимое дисциплины успешно изменено, студенты смогут просматривать его
          </Message>

          <Button onClick={props.onClose}>Закрыть</Button>
        </Flex>
      )}

      {stage === 'default' && (
        <Flex
          direction='column'
          gap={20}
        >
          <textarea
            className='text-area-ybvu'
            value={text}
            onInput={(e) => setText((e.target as any).value)}
            placeholder='Введите текст, который хотите показать студентам группы'
          />

          <Flex
            direction='column'
            gap={5}
          >
            <Button onClick={handleSaveClick}>Сохранить</Button>
            <Button onClick={props.onClose}>Закрыть</Button>
          </Flex>
        </Flex>
      )}
    </Modal>
  );
}

export default ModalEditSubjectContent;
