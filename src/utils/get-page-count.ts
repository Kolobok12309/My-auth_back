export const getPageCount = (totalCount: number, perPage: number = 20): number =>
  Math.ceil(totalCount / perPage);
