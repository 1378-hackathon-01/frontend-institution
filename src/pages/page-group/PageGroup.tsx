import { useParams } from 'react-router';
import { Flex, Page } from 'components';
import { PageUser, ScrollFiller } from 'shared/components';
import { useEffect, useState } from 'react';
import {
  IInstitutionGroupBrief,
  IInstitutionStudentApproveFull,
  IInstitutionStudentRequestFull,
  IInstitutionSubjectBrief,
} from 'common/models';
import { ApiGroups, ApiStudents, ApiSubjects } from 'common/api';
import { handleError, handleErrorAuth } from 'common/handlers';
import {
  CardGroup,
  CardStudentsApproves,
  CardStudentsRequests,
  CardSubjects,
  ModalDeleteGroup,
  ModalEditSubjectContent,
} from './components';

function PageGroups() {
  const { facultyId, groupId } = useParams();

  const [group, setGroup] = useState<IInstitutionGroupBrief | null>();

  const [requests, setRequests] = useState<IInstitutionStudentRequestFull[] | null>();
  const [approves, setApproved] = useState<IInstitutionStudentApproveFull[] | null>();

  const [subjects, setSubjects] = useState<IInstitutionSubjectBrief[] | null>();
  const [groupSubjects, setGroupSubjects] = useState<IInstitutionSubjectBrief[] | null>();

  const [modalDeleteGroup, setModalDeleteGroup] = useState<boolean>(false);
  const [modalEditSubject, setModalEditSubject] = useState<IInstitutionSubjectBrief | null>(null);

  useEffect(() => {
    loadGroup();

    loadRequests();
    loadApproved();

    loadSubjects();
    loadGroupSubjects();
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

  const loadSubjects = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          const subjects = await ApiSubjects.getInstance().getAll();

          setSubjects(subjects);
        })
    );

  const loadGroupSubjects = async () =>
    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          const subjects = await ApiSubjects.getInstance().getGroupAll(facultyId, groupId);

          setGroupSubjects(subjects);
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

  const handleSubjectAddClick = async (subject: IInstitutionSubjectBrief) => {
    setSubjects(null);
    setGroupSubjects(null);

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          await ApiSubjects.getInstance().groupAdd(facultyId, groupId, subject.id);
        })
    );

    loadSubjects();
    loadGroupSubjects();
  };

  const handleSubjectRemoveClick = async (subject: IInstitutionSubjectBrief) => {
    setSubjects(null);
    setGroupSubjects(null);

    await handleError(
      async () =>
        await handleErrorAuth(async () => {
          if (facultyId == null || groupId == null) {
            throw new Error();
          }

          await ApiSubjects.getInstance().groupRemove(facultyId, groupId, subject.id);
        })
    );

    loadSubjects();
    loadGroupSubjects();
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

      {modalEditSubject && (
        <ModalEditSubjectContent
          groupId={groupId ?? ''}
          facultyId={facultyId ?? ''}
          subject={modalEditSubject}
          onClose={() => setModalEditSubject(null)}
        />
      )}

      <PageUser>
        <Flex
          direction='column'
          gap={10}
        >
          {group != null && (
            <CardGroup
              facultyId={facultyId ?? ''}
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

          {subjects != null && groupSubjects != null && (
            <CardSubjects
              subjects={subjects}
              groupSubjects={groupSubjects}
              onAddClick={handleSubjectAddClick}
              onEditClick={setModalEditSubject}
              onRemoveClick={handleSubjectRemoveClick}
            />
          )}
          <ScrollFiller />
        </Flex>
      </PageUser>
    </Page>
  );
}

export default PageGroups;
