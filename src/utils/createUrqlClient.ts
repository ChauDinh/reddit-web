import { isServer } from "./isServer";
import gql from "graphql-tag";
import { dedupExchange, fetchExchange, stringifyVariables } from "@urql/core";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";

import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
  DeletePostMutationVariables,
} from "../generated/graphql";
import { customUpdateQuery } from "./customUpdateQuery";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("No authenticated")) {
        Router.replace("/login");
      }
    })
  );
};

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isInCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    info.partial = !isInCache;
    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fieldInfo) => {
      const key = cache.resolveFieldByKey(
        entityKey,
        fieldInfo.fieldKey
      ) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore, // true or false
      posts: results,
    };
  };
};

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate("Query", "posts", fieldInfo.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            createPost: (_result, _, cache, __) => {
              invalidateAllPosts(cache);
            },
            login: (_result, _, cache, __) => {
              customUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login?.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login?.user,
                    };
                  }
                }
              );
              invalidateAllPosts(cache);
            },
            register: (_result, _, cache, __) => {
              customUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register?.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register?.user,
                    };
                  }
                }
              );
            },
            logout: (_result, _, cache, __) => {
              customUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            vote: (_result, args, cache, __) => {
              const { value, postId } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId } as any
              ); // Data or null
              console.log("data: ", data);
              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value } as any
                );
              }
            },
            deletePost: (_result, args, cache, __) => {
              const { id } = args as DeletePostMutationVariables;
              cache.invalidate({ __typename: "Post", id });
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
