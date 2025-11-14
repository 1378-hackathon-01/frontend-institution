import { IInstitutionMeFullUser, IInstitutionStudentRequestFull } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiStudents extends BaseApiClient {
  private static instance: ApiStudents | null = null;
  static getInstance() {
    this.instance ??= new ApiStudents();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getRequests(facultyId: string, groupId: string): Promise<IInstitutionStudentRequestFull[]> {
    const response = await this.sendRequestAuth<IInstitutionStudentRequestFull[]>(
      'get',
      `/institution/faculties/${facultyId}/groups/${groupId}/students/requests`
    );

    return response;
  }

  async getApproved(facultyId: string, groupId: string): Promise<IInstitutionMeFullUser[]> {
    const response = await this.sendRequestAuth<IInstitutionMeFullUser[]>(
      'get',
      `/institution/faculties/${facultyId}/groups/${groupId}/students/approved`
    );

    return response;
  }

  async deleteApproved(facultyId: string, groupId: string, studentId: string): Promise<void> {
    await this.sendRequestAuth(
      'delete',
      `/institution/faculties/${facultyId}/groups/${groupId}/students/approved/${studentId}`
    );
  }

  async approveRequest(facultyId: string, groupId: string, studentId: string): Promise<void> {
    await this.sendRequestAuth(
      'post',
      `/institution/faculties/${facultyId}/groups/${groupId}/students/requests/${studentId}`
    );
  }

  async declineRequest(facultyId: string, groupId: string, studentId: string): Promise<void> {
    await this.sendRequestAuth(
      'delete',
      `/institution/faculties/${facultyId}/groups/${groupId}/students/requests/${studentId}`
    );
  }
}

export default ApiStudents;
