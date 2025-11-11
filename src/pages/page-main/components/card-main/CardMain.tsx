import { useRecoilValue } from 'recoil';
import * as bi from 'react-bootstrap-icons';
import { Box, Flex, Header, Message } from 'components';
import { RoutingUrls } from 'common/const';
import { atomUser } from 'common/atoms';
import { CardLink } from './components';

function CardMain() {
  const auth = useRecoilValue(atomUser);

  if (auth == null) {
    throw new Error('Invalid state!');
  }

  return (
    <Box padding={20}>
      <Flex
        direction='column'
        gap={20}
      >
        <Header>Добро пожаловать, {auth.user.fullName}</Header>

        <Message
          type='info'
          title='Подсказка'
        >
          <p>Вы находитесь в панели управления учебного заведения {auth.institution.abbreviation}!</p>

          <p>{auth.institution.title}</p>
        </Message>

        <Flex direction='column'>
          <CardLink
            icon={<bi.Radar />}
            href={RoutingUrls.Faculties}
            label='Управление факультетами'
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CardMain;
