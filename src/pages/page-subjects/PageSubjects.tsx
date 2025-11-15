import { ApiSubjects } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import { IInstitutionSubjectBrief } from 'common/models';
import { Flex, Page } from 'components';
import { useEffect, useState } from 'react';
import { PageUser, ScrollFiller } from 'shared/components';
import { CardSubjects, ModalAddSubject } from './components';

function PageSubjects() {
  const [subjects, setSubjects] = useState<IInstitutionSubjectBrief[] | null>(null);
  const [modalAddSubject, setModalAddSubject] = useState<boolean>(false);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () =>
    await handleErrorAuth(
      async () =>
        await handleError(async () => {
          const faculties = await ApiSubjects.getInstance().getAll();

          setSubjects(faculties);
        })
    );

  const handleDeleteClick = async (subject: IInstitutionSubjectBrief) => {
    setSubjects(null);

    await handleErrorAuth(
      async () => await handleError(async () => await ApiSubjects.getInstance().delete(subject.id))
    );

    loadSubjects();
  };

  const handleModalClose = () => {
    setSubjects(null);
    setModalAddSubject(false);
    loadSubjects();
  };

  return (
    <Page title='Учебные дисциплины'>
      {modalAddSubject && <ModalAddSubject onClose={handleModalClose} />}

      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {subjects != null && (
            <CardSubjects
              subjects={subjects}
              onAddClick={() => setModalAddSubject(true)}
              onDeleteClick={handleDeleteClick}
            />
          )}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageSubjects;
