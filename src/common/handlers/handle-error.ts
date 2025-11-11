import { RoutingUrls } from 'common/const';

const timer = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleError<T>(operation: () => Promise<T>): Promise<T> {
  try {
    const result = await operation();
    return result;
  } catch (e) {
    window.location.assign(RoutingUrls.Error);
    await timer(10000);
    throw e;
  }
}

export default handleError;
