import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Scalar for BigDecimal */
  BigDecimal: any;
  /** Scalar for BigInteger */
  BigInteger: any;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  follow?: Maybe<User>;
  register?: Maybe<User>;
  sendNotification?: Maybe<Array<Maybe<NotificationResponse>>>;
  unfollow?: Maybe<User>;
  updateToken?: Maybe<User>;
};


/** Mutation root */
export type MutationFollowArgs = {
  id?: InputMaybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationRegisterArgs = {
  newUser?: InputMaybe<NewUserInput>;
};


/** Mutation root */
export type MutationSendNotificationArgs = {
  message?: InputMaybe<NotificationInput>;
};


/** Mutation root */
export type MutationUnfollowArgs = {
  id?: InputMaybe<Scalars['BigInteger']>;
};


/** Mutation root */
export type MutationUpdateTokenArgs = {
  token?: InputMaybe<Scalars['String']>;
};

export type NewUserInput = {
  token?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type NotificationInput = {
  body?: InputMaybe<Scalars['String']>;
};

export type NotificationResponse = {
  __typename?: 'NotificationResponse';
  id?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  search?: Maybe<Array<Maybe<User>>>;
};


/** Query root */
export type QuerySearchArgs = {
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  followers?: Maybe<Array<Maybe<User>>>;
  followersCount: Scalars['Int'];
  following?: Maybe<Array<Maybe<User>>>;
  id?: Maybe<Scalars['BigInteger']>;
  token?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UpdateTokenMutationVariables = Exact<{
  token?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTokenMutation = { __typename?: 'Mutation', updateToken?: { __typename?: 'User', token?: string | null } | null };

export type MeHomeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeHomeQuery = { __typename?: 'Query', me?: { __typename?: 'User', token?: string | null, username?: string | null, followersCount: number } | null };

export type RegisterMutationVariables = Exact<{
  newUser: NewUserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id?: any | null, uid?: string | null, username?: string | null, token?: string | null } | null };

export type MeRegisterQueryVariables = Exact<{ [key: string]: never; }>;


export type MeRegisterQuery = { __typename?: 'Query', me?: { __typename?: 'User', username?: string | null } | null };

export type SendNotificationMutationVariables = Exact<{
  message: NotificationInput;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification?: Array<{ __typename?: 'NotificationResponse', id?: string | null, message?: string | null, status?: string | null } | null> | null };

export type FollowMutationVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow?: { __typename?: 'User', following?: Array<{ __typename?: 'User', id?: any | null } | null> | null } | null };

export type UnfollowMutationVariables = Exact<{
  id: Scalars['BigInteger'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow?: { __typename?: 'User', following?: Array<{ __typename?: 'User', id?: any | null } | null> | null } | null };

export type SearchQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SearchQuery = { __typename?: 'Query', search?: Array<{ __typename?: 'User', id?: any | null, username?: string | null } | null> | null };

export type MeFollowQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFollowQuery = { __typename?: 'Query', me?: { __typename?: 'User', followers?: Array<{ __typename?: 'User', id?: any | null } | null> | null } | null };


export const UpdateTokenDocument = gql`
    mutation UpdateToken($token: String) {
  updateToken(token: $token) {
    token
  }
}
    `;
export type UpdateTokenMutationFn = Apollo.MutationFunction<UpdateTokenMutation, UpdateTokenMutationVariables>;

/**
 * __useUpdateTokenMutation__
 *
 * To run a mutation, you first call `useUpdateTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTokenMutation, { data, loading, error }] = useUpdateTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useUpdateTokenMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTokenMutation, UpdateTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTokenMutation, UpdateTokenMutationVariables>(UpdateTokenDocument, options);
      }
export type UpdateTokenMutationHookResult = ReturnType<typeof useUpdateTokenMutation>;
export type UpdateTokenMutationResult = Apollo.MutationResult<UpdateTokenMutation>;
export type UpdateTokenMutationOptions = Apollo.BaseMutationOptions<UpdateTokenMutation, UpdateTokenMutationVariables>;
export const MeHomeDocument = gql`
    query MeHome {
  me {
    token
    username
    followersCount
  }
}
    `;

/**
 * __useMeHomeQuery__
 *
 * To run a query within a React component, call `useMeHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeHomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeHomeQuery(baseOptions?: Apollo.QueryHookOptions<MeHomeQuery, MeHomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeHomeQuery, MeHomeQueryVariables>(MeHomeDocument, options);
      }
export function useMeHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeHomeQuery, MeHomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeHomeQuery, MeHomeQueryVariables>(MeHomeDocument, options);
        }
export type MeHomeQueryHookResult = ReturnType<typeof useMeHomeQuery>;
export type MeHomeLazyQueryHookResult = ReturnType<typeof useMeHomeLazyQuery>;
export type MeHomeQueryResult = Apollo.QueryResult<MeHomeQuery, MeHomeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($newUser: NewUserInput!) {
  register(newUser: $newUser) {
    id
    uid
    username
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      newUser: // value for 'newUser'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeRegisterDocument = gql`
    query MeRegister {
  me {
    username
  }
}
    `;

/**
 * __useMeRegisterQuery__
 *
 * To run a query within a React component, call `useMeRegisterQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeRegisterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeRegisterQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeRegisterQuery(baseOptions?: Apollo.QueryHookOptions<MeRegisterQuery, MeRegisterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeRegisterQuery, MeRegisterQueryVariables>(MeRegisterDocument, options);
      }
export function useMeRegisterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeRegisterQuery, MeRegisterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeRegisterQuery, MeRegisterQueryVariables>(MeRegisterDocument, options);
        }
export type MeRegisterQueryHookResult = ReturnType<typeof useMeRegisterQuery>;
export type MeRegisterLazyQueryHookResult = ReturnType<typeof useMeRegisterLazyQuery>;
export type MeRegisterQueryResult = Apollo.QueryResult<MeRegisterQuery, MeRegisterQueryVariables>;
export const SendNotificationDocument = gql`
    mutation sendNotification($message: NotificationInput!) {
  sendNotification(message: $message) {
    id
    message
    status
  }
}
    `;
export type SendNotificationMutationFn = Apollo.MutationFunction<SendNotificationMutation, SendNotificationMutationVariables>;

/**
 * __useSendNotificationMutation__
 *
 * To run a mutation, you first call `useSendNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendNotificationMutation, { data, loading, error }] = useSendNotificationMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useSendNotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationMutation, SendNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationMutation, SendNotificationMutationVariables>(SendNotificationDocument, options);
      }
export type SendNotificationMutationHookResult = ReturnType<typeof useSendNotificationMutation>;
export type SendNotificationMutationResult = Apollo.MutationResult<SendNotificationMutation>;
export type SendNotificationMutationOptions = Apollo.BaseMutationOptions<SendNotificationMutation, SendNotificationMutationVariables>;
export const FollowDocument = gql`
    mutation follow($id: BigInteger!) {
  follow(id: $id) {
    following {
      id
    }
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const UnfollowDocument = gql`
    mutation unfollow($id: BigInteger!) {
  unfollow(id: $id) {
    following {
      id
    }
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const SearchDocument = gql`
    query search($username: String!) {
  search(username: $username) {
    id
    username
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export const MeFollowDocument = gql`
    query meFollow {
  me {
    followers {
      id
    }
  }
}
    `;

/**
 * __useMeFollowQuery__
 *
 * To run a query within a React component, call `useMeFollowQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeFollowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeFollowQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeFollowQuery(baseOptions?: Apollo.QueryHookOptions<MeFollowQuery, MeFollowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeFollowQuery, MeFollowQueryVariables>(MeFollowDocument, options);
      }
export function useMeFollowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeFollowQuery, MeFollowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeFollowQuery, MeFollowQueryVariables>(MeFollowDocument, options);
        }
export type MeFollowQueryHookResult = ReturnType<typeof useMeFollowQuery>;
export type MeFollowLazyQueryHookResult = ReturnType<typeof useMeFollowLazyQuery>;
export type MeFollowQueryResult = Apollo.QueryResult<MeFollowQuery, MeFollowQueryVariables>;