import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardMain } from './components';

function PageMain() {
  return (
    <Page title='Главная страница'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          <CardMain />
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageMain;
