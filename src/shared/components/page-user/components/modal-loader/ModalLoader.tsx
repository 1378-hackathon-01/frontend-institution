import { Flex, Loader, Logo, Modal } from 'components';
import './style.scss';

function ModalLoader() {
  return (
    <Modal size='fullscreen'>
      <Flex justifyContent='center'>
        <Flex
          alignItems='center'
          direction='column'
        >
          <div className='filler-96ihl' />
          <Logo size={{ width: 7 }} />
          <Loader
            size='default'
            color='01'
            variant='line'
          />
        </Flex>
      </Flex>
    </Modal>
  );
}

export default ModalLoader;
