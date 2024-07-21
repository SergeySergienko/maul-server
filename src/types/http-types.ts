import { Request } from 'express';
import { ParsedQs } from 'qs';

export type UniversalRequest<
  P = {},
  B = {},
  Q extends ParsedQs = ParsedQs
> = Request<P, {}, B, Q>;

export type RequestWithParams<T> = UniversalRequest<T>;
export type RequestWithBody<T> = UniversalRequest<{}, T>;
// export type RequestWithParamsAndBody<P, T> = UniversalRequest<P, T>;
export type RequestWithQuery<T extends ParsedQs> = UniversalRequest<{}, {}, T>;
