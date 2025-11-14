import { IInstitutionGroupBrief, IInstitutionGroupPost } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiGroups extends BaseApiClient {
  private static instance: ApiGroups | null = null;
  static getInstance() {
    this.instance ??= new ApiGroups();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getAll(facultyId: string): Promise<IInstitutionGroupBrief[]> {
    const response = await this.sendRequestAuth<IInstitutionGroupBrief[]>(
      'get',
      `/institution/faculties/${facultyId}/groups`
    );

    return response;
  }

  async get(facultyId: string, groupId: string): Promise<IInstitutionGroupBrief> {
    const response = await this.sendRequestAuth<IInstitutionGroupBrief>(
      'get',
      `/institution/faculties/${facultyId}/groups/${groupId}`
    );

    return response;
  }

  async create(facultyId: string, request: IInstitutionGroupPost): Promise<void> {
    await this.sendRequestAuth('post', `/institution/faculties/${facultyId}/groups`, request);
  }

  async delete(facultyId: string, groupId: string): Promise<void> {
    await this.sendRequestAuth('delete', `/institution/faculties/${facultyId}/groups/${groupId}`);
  }
}

export default ApiGroups;
