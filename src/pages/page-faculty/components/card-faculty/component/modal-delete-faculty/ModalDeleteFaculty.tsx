import { ApiFaculties } from 'common/api';
import { RoutingUrls } from 'common/const';
import { handleError, handleErrorAuth } from 'common/handlers';
import { IInstitutionFacultyFull } from 'common/models';
import { Button, Flex, Loader, Message, Modal } from 'components';
import { useState } from 'react';

type Stage = 'default' | 'loading';

interface IProps {
  onClose: () => void;
  faculty: IInstitutionFacultyFull;
}

function ModalDeleteFaculty(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');

  const handleConfirmClick = async () =>
    await handleError(async () =>
      handleErrorAuth(async () => {
        setStage('loading');

        await ApiFaculties.getInstance().delete(props.faculty.id);

        window.location.assign(RoutingUrls.Faculties);
      })
    );

  return (
    <Modal
      size={400}
      onClose={stage !== 'loading' ? props.onClose : undefined}
      header='Удаление факультета'
    >
      {stage === 'loading' && (
        <Flex
          justifyContent='center'
          alignItems='center'
        >
          <Loader
            variant='line'
            size='default'
            color='01'
          />
        </Flex>
      )}
      {stage === 'default' && (
        <Flex
          direction='column'
          gap={20}
        >
          <Message
            type='warning'
            title='Подтвердите действие'
          >
            <p>
              Вы действительно хотите удалить факультет?
              <br />
              Будут удалены так же все группы.
            </p>
          </Message>

          <Flex
            justifyContent='center'
            gap={5}
          >
            <Button onClick={handleConfirmClick}>Да</Button>
            <Button onClick={props.onClose}>Нет</Button>
          </Flex>
        </Flex>
      )}
    </Modal>
  );
}

export default ModalDeleteFaculty;
