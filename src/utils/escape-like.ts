export const escapeLike = (raw: string): string =>
  raw.replace(/[\\%_]/g, '//$&');
