import { ApiGroups } from 'common/api';
import { RoutingUrls } from 'common/const';
import { handleError, handleErrorAuth } from 'common/handlers';
import { Button, Flex, Loader, Message, Modal } from 'components';
import { useState } from 'react';

type Stage = 'default' | 'loading';

interface IProps {
  onClose: () => void;
  facultyId: string;
  groupId: string;
}

function ModalDeleteGroup(props: IProps) {
  const [stage, setStage] = useState<Stage>('default');

  const handleConfirmClick = async () =>
    await handleError(async () =>
      handleErrorAuth(async () => {
        setStage('loading');

        await ApiGroups.getInstance().delete(props.facultyId, props.groupId);

        window.location.assign(RoutingUrls.Faculty.replaceAll(':facultyId', props.facultyId));
      })
    );

  return (
    <Modal
      size={400}
      onClose={stage !== 'loading' ? props.onClose : undefined}
      header='Удаление группы'
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
            <p>Вы действительно хотите удалить группу?</p>
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

export default ModalDeleteGroup;
