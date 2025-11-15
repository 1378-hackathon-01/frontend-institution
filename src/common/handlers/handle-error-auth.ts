import { ApiError, ApiErrorCode } from 'common/api-lib';
import { RoutingUrls } from 'common/const';

const timer = (ms: number): Promise<null> => new Promise((res) => setTimeout(res, ms));

async function handleErrorAuth<T>(operation: () => Promise<T>): Promise<T> {
  try {
    const result = await operation();
    return result;
  } catch (e) {
    if (e instanceof ApiError && e.code === ApiErrorCode.Unauthorized) {
      window.location.assign(RoutingUrls.Auth);
      await timer(10000);
      throw e;
    } else {
      throw e;
    }
  }
}

export default handleErrorAuth;
