import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function customUpdateQuery<Result, Query>(
  cache: Cache,
  queryInput: QueryInput,
  result: any,
  updateFunc: (result: Result, query: Query) => Query
) {
  return cache.updateQuery(
    queryInput,
    (data) => updateFunc(result, data as any) as any
  );
}
