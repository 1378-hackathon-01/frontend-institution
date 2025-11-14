import { useParams } from 'react-router';
import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { useEffect, useState } from 'react';
import { IInstitutionGroupBrief } from 'common/models';
import { ApiGroups } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import { CardGroup, ModalDeleteGroup } from './components';

function PageGroups() {
  const { facultyId, groupId } = useParams();
  const [group, setGroup] = useState<IInstitutionGroupBrief | null>();
  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          const group = await ApiGroups.getInstance().get(facultyId, groupId);

          setGroup(group);
        })
    );

  return (
    <Page title='Группа'>
      {modalDeleteGroup && (
        <ModalDeleteGroup
          groupId={groupId ?? ''}
          facultyId={facultyId ?? ''}
          onClose={() => setModalDeleteGroup(false)}
        />
      )}

      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {group != null && (
            <CardGroup
              group={group}
              onDeleteClick={() => setModalDeleteGroup(true)}
            />
          )}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageGroups;
