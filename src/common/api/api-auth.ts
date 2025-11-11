import { IInstitutionAuthBrief } from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiAuth extends BaseApiClient {
  private static instance: ApiAuth | null = null;
  static getInstance() {
    this.instance ??= new ApiAuth();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async login(login: string, password: string): Promise<IInstitutionAuthBrief> {
    const response = await this.sendRequest<IInstitutionAuthBrief>('get', '/institution/auth/login', {
      login: login.trim(),
      password: password.trim(),
    });

    return response;
  }
}

export default ApiAuth;
