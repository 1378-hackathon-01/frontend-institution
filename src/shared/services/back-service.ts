class BackService {
  private static instance: BackService | null = null;
  private readonly callbacks: (() => void)[];
  private pushCount = 0;

  private constructor() {
    this.callbacks = [];
    window.addEventListener('popstate', () => this.handleBack());
  }

  public static getInstance(): BackService {
    if (this.instance == null) {
      this.instance = new BackService();
    }

    return this.instance;
  }

  push(callback: () => void) {
    this.pushCount++;
    history.pushState({ number: this.pushCount }, '', null);
    this.callbacks.push(callback);
  }

  pop(historyBack: boolean) {
    if (this.pushCount > 0 && historyBack) {
      this.pushCount--;
    }

    const callback = this.callbacks.pop();
    return callback ?? null;
  }

  private handleBack() {
    this.pushCount--;
    const callback = this.callbacks.pop();
    callback?.();
  }
}

export default BackService;
