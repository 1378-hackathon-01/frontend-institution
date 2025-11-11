import {
  IInstitutionFacultyBrief,
  IInstitutionFacultyFull,
  IInstitutionFacultyPost,
  IInstitutionMeFull,
} from 'common/models';
import { BaseApiClient } from './base-api-client';

class ApiFaculties extends BaseApiClient {
  private static instance: ApiFaculties | null = null;
  static getInstance() {
    this.instance ??= new ApiFaculties();
    return this.instance;
  }

  private constructor() {
    super();
  }

  async getAll(): Promise<IInstitutionFacultyBrief[]> {
    const response = await this.sendRequestAuth<IInstitutionFacultyBrief[]>('get', '/institution/faculties');
    return response;
  }

  async get(facultyId: string): Promise<IInstitutionFacultyFull> {
    const response = await this.sendRequestAuth<IInstitutionFacultyFull>('get', `/institution/faculties/${facultyId}`);

    return response;
  }

  async create(request: IInstitutionFacultyPost): Promise<void> {
    await this.sendRequestAuth('post', '/institution/faculties', request);
  }

  async delete(facultyId: string): Promise<void> {
    await this.sendRequestAuth('delete', `/institution/faculties/${facultyId}`);
  }
}

export default ApiFaculties;
