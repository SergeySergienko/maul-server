export type IdParamsDTO = {
  id: string;
};

export type QueryDTO = {
  limit?: string;
  sort?: 'asc' | 'desc';
  [key: string]: any;
};
