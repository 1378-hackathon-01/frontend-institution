import { RoutingUrls } from 'common/const';
import { AuthService } from 'common/services';
import { Box, Button, Flex, Header, Message, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';

function PageProfile() {
  const handleLogoutClick = () => {
    AuthService.getInstance().delete();
    window.location.assign(RoutingUrls.Auth);
  };

  return (
    <Page title='Профиль'>
      <PageUser>
        <Box padding={20}>
          <Flex
            direction='column'
            gap={20}
          >
            <Header>Управление профилем</Header>

            <Message
              type='warning'
              title='Ограниченный функционал'
            >
              <p>
                Архитектурно в платформу заложена система орграничения прав доступа и система управления сотрудниками
                образовательного учреждения.
              </p>
              <p>
                Однако в данной версии веб-приложения этот функционал отсутствует из-за чрезвычайно сжатых сроков
                разработки программного обеспечения.
              </p>
            </Message>

            <Button onClick={handleLogoutClick}>Выйти из аккаунта</Button>
          </Flex>
        </Box>

        <ScrollFiller />
      </PageUser>
    </Page>
  );
}

export default PageProfile;
