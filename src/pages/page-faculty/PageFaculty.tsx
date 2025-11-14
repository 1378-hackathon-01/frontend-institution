import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Flex, Page } from 'components';
import { IInstitutionFacultyFull, IInstitutionGroupBrief } from 'common/models';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardFaculty, CardGroups, CardLoader, ModalCreateGroup } from './components';
import { handleError, handleErrorAuth } from 'common/handlers';
import { ApiFaculties, ApiGroups } from 'common/api';

function PageFaculty() {
  const { facultyId } = useParams();

  const [faculty, setFaculty] = useState<IInstitutionFacultyFull | null>(null);
  const [groups, setGroups] = useState<IInstitutionGroupBrief[] | null>(null);
  const [createModalGroup, setCreateModalGroup] = useState<boolean>(false);

  useEffect(() => {
    loadFaculty();
    loadGroups();
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

  const loadGroups = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null) {
            throw new Error();
          }

          const groups = await ApiGroups.getInstance().getAll(facultyId);

          setGroups(groups);
        })
    );

  const handleCloseModal = () => {
    setFaculty(null);
    setGroups(null);
    setCreateModalGroup(false);

    loadFaculty();
    loadGroups();
  };

  return (
    <Page title='Факультет'>
      {createModalGroup && (
        <ModalCreateGroup
          facultyId={facultyId ?? ''}
          onClose={handleCloseModal}
        />
      )}

      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {faculty == null && <CardLoader />}
          {faculty != null && <CardFaculty faculty={faculty} />}
          {groups != null && (
            <CardGroups
              facultyId={facultyId ?? ''}
              groups={groups}
              onCreateClick={() => setCreateModalGroup(true)}
            />
          )}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageFaculty;
