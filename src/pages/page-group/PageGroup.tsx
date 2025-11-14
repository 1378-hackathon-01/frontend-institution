import { useParams } from 'react-router';
import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { useEffect, useState } from 'react';
import { IInstitutionGroupBrief, IInstitutionStudentApproveFull, IInstitutionStudentRequestFull } from 'common/models';
import { ApiGroups, ApiStudents } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import { CardGroup, CardStudentsApproves, CardStudentsRequests, ModalDeleteGroup } from './components';

function PageGroups() {
  const { facultyId, groupId } = useParams();
  const [group, setGroup] = useState<IInstitutionGroupBrief | null>();
  const [requests, setRequests] = useState<IInstitutionStudentRequestFull[] | null>();
  const [approves, setApproved] = useState<IInstitutionStudentApproveFull[] | null>();
  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);

  useEffect(() => {
    loadGroup();
    loadRequests();
    loadApproved();
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

  const loadRequests = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          const requests = await ApiStudents.getInstance().getRequests(facultyId, groupId);

          setRequests(requests);
        })
    );

  const loadApproved = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          const approved = await ApiStudents.getInstance().getApproved(facultyId, groupId);

          setApproved(approved);
        })
    );

  const handleRequestApproveClick = async (request: IInstitutionStudentRequestFull) => {
    setRequests(null);
    setApproved(null);

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          await ApiStudents.getInstance().approveRequest(facultyId, groupId, request.id);
        })
    );

    loadRequests();
    loadApproved();
  };

  const handleRequestDeclineClick = async (request: IInstitutionStudentRequestFull) => {
    setRequests(null);
    setApproved(null);

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          await ApiStudents.getInstance().declineRequest(facultyId, groupId, request.id);
        })
    );

    loadRequests();
    loadApproved();
  };

  const handleApprovedDeleteClick = async (request: IInstitutionStudentRequestFull) => {
    setRequests(null);
    setApproved(null);

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          await ApiStudents.getInstance().deleteApproved(facultyId, groupId, request.id);
        })
    );

    loadRequests();
    loadApproved();
  };

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
          {requests != null && (
            <CardStudentsRequests
              students={requests}
              onApproveClick={handleRequestApproveClick}
              onDeclineClick={handleRequestDeclineClick}
            />
          )}
          {approves != null && (
            <CardStudentsApproves
              students={approves}
              onDeleteClick={handleApprovedDeleteClick}
            />
          )}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageGroups;
