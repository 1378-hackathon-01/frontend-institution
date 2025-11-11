function createClassName(...args: (string | null | undefined)[]): string {
  let classNames: string[] = [];

  for (const arg of args) {
    const trimmed = arg?.trim();

    if (trimmed == null || trimmed.length === 0) {
      continue;
    }

    classNames.push(trimmed);
  }

  return classNames.join(' ');
}

export default createClassName;
