import {
  IInstitutionGroupSubjectFull,
  IInstitutionGroupSubjectPatch,
  IInstitutionSubjectBrief,
  IInstitutionSubjectPost,
} from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiSubjects extends BaseApiClient {
  private static instance: ApiSubjects | null = null;
  static getInstance() {
    this.instance ??= new ApiSubjects();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getAll(): Promise<IInstitutionSubjectBrief[]> {
    const response = await this.sendRequestAuth<IInstitutionSubjectBrief[]>('get', '/institution/subjects');
    return response;
  }

  async getGroupAll(facultyId: string, groupId: string): Promise<IInstitutionSubjectBrief[]> {
    const response = await this.sendRequestAuth<IInstitutionSubjectBrief[]>(
      'get',
      `/institution/faculties/${facultyId}/groups/${groupId}/subjects`
    );
    return response;
  }

  async getGroupFull(facultyId: string, groupId: string, subjectId: string): Promise<IInstitutionGroupSubjectFull> {
    const response = await this.sendRequestAuth<IInstitutionGroupSubjectFull>(
      'get',
      `/institution/faculties/${facultyId}/groups/${groupId}/subjects/${subjectId}`
    );
    return response;
  }

  async putGroup(
    facultyId: string,
    groupId: string,
    subjectId: string,
    request: IInstitutionGroupSubjectPatch
  ): Promise<void> {
    await this.sendRequestAuth(
      'put',
      `/institution/faculties/${facultyId}/groups/${groupId}/subjects/${subjectId}`,
      request
    );
  }

  async groupAdd(facultyId: string, groupId: string, subjectId: string): Promise<void> {
    await this.sendRequestAuth('post', `/institution/faculties/${facultyId}/groups/${groupId}/subjects/${subjectId}`);
  }

  async groupRemove(facultyId: string, groupId: string, subjectId: string): Promise<void> {
    await this.sendRequestAuth('delete', `/institution/faculties/${facultyId}/groups/${groupId}/subjects/${subjectId}`);
  }

  async create(request: IInstitutionSubjectPost): Promise<void> {
    await this.sendRequestAuth('post', '/institution/subjects', request);
  }

  async delete(subjectId: string): Promise<void> {
    await this.sendRequestAuth('delete', `/institution/subjects/${subjectId}`);
  }
}

export default ApiSubjects;
