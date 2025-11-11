import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Flex, Page } from 'components';
import { IInstitutionFacultyFull } from 'common/models';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardFaculty, CardLoader } from './components';
import { handleError, handleErrorAuth } from 'common/handlers';
import { ApiFaculties } from 'common/api';

function PageFaculty() {
  const { facultyId } = useParams();
  const [faculty, setFaculty] = useState<IInstitutionFacultyFull | null>(null);

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null) {
            throw new Error();
          }

          const faculty = await ApiFaculties.getInstance().get(facultyId);

          setFaculty(faculty);
        })
    );

  return (
    <Page title='Факультет'>
      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {faculty == null && <CardLoader />}
          {faculty != null && <CardFaculty faculty={faculty} />}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageFaculty;
