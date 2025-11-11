import { Flex, Loader } from 'components';
import './style.scss';

function StageLoading() {
  return (
    <Flex
      className='loader-cntr-easn'
      direction='column'
      justifyContent='center'
      alignItems='center'
      gap={20}
    >
      <Loader
        size='default'
        variant='line'
        color='01'
      />
      <div />
      <div />
      <div />
    </Flex>
  );
}

export default StageLoading;
