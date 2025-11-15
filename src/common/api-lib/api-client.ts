import axios, { AxiosError } from 'axios';
import { ApiErrorCode } from '.';
import { ApiError } from '.';

import type { AxiosRequestConfig } from 'axios';

type RequestMethod = 'post' | 'get' | 'put' | 'delete';

class ApiClient {
  private static instance: ApiClient | null = null;

  static getInstance(): ApiClient {
    if (this.instance == null) {
      this.instance = new ApiClient();
    }

    return this.instance;
  }

  async sendRequest<TRes>(
    method: RequestMethod,
    address: string,
    body?: any,
    jwt?: string | null
  ): Promise<TRes> {
    const headers: { [key: string]: string } = {};

    if (jwt != null) {
      const authHeader = `Bearer ${jwt}`;
      headers['Authorization'] = authHeader;
    }

    const isBodyless = method === 'get' || method === 'delete';

    const config: AxiosRequestConfig = {
      headers: headers,
      method: method,
      url: address,
      data: !isBodyless ? body : null,
      params: isBodyless ? body : null,
      paramsSerializer: {
        indexes: null,
      },
    };

    try {
      const result = await axios<TRes>(config);
      return result.data as TRes;
    } catch (e) {
      if (!(e instanceof AxiosError)) {
        throw e;
      }

      const errorCode =
        e.response?.status == null ? null : Number(e.response.status);

      if (errorCode === ApiErrorCode.BadRequest) {
        throw new ApiError(ApiErrorCode.BadRequest);
      } else if (errorCode === ApiErrorCode.NotFound) {
        throw new ApiError(ApiErrorCode.NotFound);
      } else if (errorCode === ApiErrorCode.Conflict) {
        throw new ApiError(ApiErrorCode.Conflict);
      } else if (errorCode === ApiErrorCode.Unauthorized) {
        throw new ApiError(ApiErrorCode.Unauthorized);
      } else if (errorCode === ApiErrorCode.Forbidden) {
        throw new ApiError(ApiErrorCode.Forbidden);
      } else {
        throw new ApiError(ApiErrorCode.Unexpected);
      }
    }
  }
}

export default ApiClient;
