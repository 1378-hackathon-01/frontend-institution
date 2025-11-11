import { Box, Button, Flex, Header, Message, Page } from 'components';
import * as bi from 'react-bootstrap-icons';
import './style.scss';
import { RoutingUrls } from 'common/const';

function PageError() {
  return (
    <Page title='Ошибка'>
      <Flex justifyContent='center'>
        <Box
          className='box-err-ovma'
          padding={20}
        >
          <Flex
            direction='column'
            gap={20}
          >
            <Header
              element='h1'
              align='center'
            >
              Ошибка!
            </Header>

            <Message
              type='error'
              title='Ошибка'
            >
              <Flex
                className='err-buan'
                justifyContent='center'
              >
                <bi.XCircle />
              </Flex>

              <p>Во время работы сайта произошла критическая ошибка!</p>
              <p>Повторите попытку позже или обратитесь к разработчикам сайта.</p>
            </Message>

            <Flex
              direction='column'
              gap={5}
            >
              <Button href={RoutingUrls.Main}>Главная страница</Button>
              <Button onClick={() => window.history.back()}>Назад</Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Page>
  );
}

export default PageError;
