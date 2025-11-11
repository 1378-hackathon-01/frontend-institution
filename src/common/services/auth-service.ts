import { storageKeys } from 'common/const';

interface ITokenData {
  jwt: string;
}

class AuthService {
  private static instance: AuthService | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (this.instance == null) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  delete() {
    localStorage.removeItem(storageKeys.AUTH_TOKEN);
  }

  set(jwt: string) {
    const data: ITokenData = {
      jwt: jwt,
    };

    const jsonString = JSON.stringify(data);
    const base64 = btoa(jsonString);
    localStorage.setItem(storageKeys.AUTH_TOKEN, base64);
  }

  get(): ITokenData | null {
    try {
      const base64 = localStorage.getItem(storageKeys.AUTH_TOKEN);
      const jsonString = base64 != null ? atob(base64) : null;
      return jsonString != null ? (JSON.parse(jsonString) as ITokenData) : null;
    } catch {
      return null;
    }
  }
}

export default AuthService;
