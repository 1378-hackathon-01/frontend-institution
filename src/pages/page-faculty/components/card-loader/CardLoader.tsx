import { Box, Flex, Loader } from 'components';

function CardLoader() {
  return (
    <Box padding={20}>
      <Flex
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Loader
          variant='line'
          color='01'
          size='default'
        />
      </Flex>
    </Box>
  );
}

export default CardLoader;
