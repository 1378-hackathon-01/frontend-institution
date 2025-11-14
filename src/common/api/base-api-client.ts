import { API_DEVELOP, API_PRODUCT } from 'common/const';
import { ApiClient } from '@1378-hackathon-01/frontend-api-client';
import { AuthService } from 'common/services';

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export abstract class BaseApiClient {
  protected async sendRequest<T>(method: RequestMethod, address: string, request?: any): Promise<T> {
    const response = await this.sendRequestAuthOrNot<T>(method, address, request);
    return response;
  }

  protected async sendRequestAuth<T>(method: RequestMethod, address: string, request?: any): Promise<T> {
    const authData = AuthService.getInstance().get();
    const response = await this.sendRequestAuthOrNot<T>(method, address, request, authData?.jwt);
    return response;
  }

  private async sendRequestAuthOrNot<T>(
    method: RequestMethod,
    address: string,
    request?: any,
    jwt?: string | null
  ): Promise<T> {
    const apiAddress = this.createApiAddress(address);
    const apiClient = ApiClient.getInstance();
    const response = await apiClient.sendRequest<T>(method, apiAddress, request, jwt);
    return response;
  }

  /** Адрес должен начинаться с «/» */
  private createApiAddress(endpoint: string): string {
    const address = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? API_DEVELOP : API_PRODUCT);
    return `${address}${endpoint}`;
  }
}
