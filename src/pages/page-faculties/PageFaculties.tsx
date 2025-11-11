import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardFaculties } from './components';

function PageFaculties() {
  return (
    <Page title='Факультеты'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          <CardFaculties />
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageFaculties;
