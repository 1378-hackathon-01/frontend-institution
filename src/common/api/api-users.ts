import { IInstitutionMeFull } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiUsers extends BaseApiClient {
  private static instance: ApiUsers | null = null;
  static getInstance() {
    this.instance ??= new ApiUsers();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getMe(): Promise<IInstitutionMeFull> {
    const response = await this.sendRequestAuth<IInstitutionMeFull>('get', '/institution/users/me');
    return response;
  }
}

export default ApiUsers;
