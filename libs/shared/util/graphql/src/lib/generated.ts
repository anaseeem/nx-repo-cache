/* eslint-disable */
// @ts-nocheck
import { ObjectId } from 'mongodb';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export class Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  ObjectId: { input: ObjectId; output: ObjectId; }
  Upload: { input: any; output: any; }
};

export class AccessToken {
  __typename?: 'AccessToken';
  access_token: Scalars['String']['output'];
};

export class AddUserInput {
  group?: InputMaybe<Scalars['String']['input']>;
  roles: Array<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export class AssignUploadInput {
  fileId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  thumbId?: InputMaybe<Scalars['ID']['input']>;
  type: Scalars['String']['input'];
};

export class ChangePwdInput {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export class Error {
  __typename?: 'Error';
  location?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export class File {
  __typename?: 'File';
  _id: Scalars['ID']['output'];
  chunkSize?: Maybe<Scalars['Int']['output']>;
  contentType: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<FileMetadata>;
  uploadDate?: Maybe<Scalars['Date']['output']>;
};

export class FileMetadata {
  __typename?: 'FileMetadata';
  author?: Maybe<Scalars['String']['output']>;
  billNumber?: Maybe<Scalars['Int']['output']>;
  billYear?: Maybe<Scalars['Int']['output']>;
  birthday?: Maybe<Scalars['Date']['output']>;
  children?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  codec?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discharge?: Maybe<Scalars['Date']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  editedId?: Maybe<Scalars['ID']['output']>;
  editorId?: Maybe<Scalars['ID']['output']>;
  filename?: Maybe<Scalars['String']['output']>;
  fullId?: Maybe<Scalars['ID']['output']>;
  gallery?: Maybe<Array<Gallery>>;
  galleryPublic?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  height?: Maybe<Scalars['Int']['output']>;
  isBilled?: Maybe<Scalars['Date']['output']>;
  isFinalized?: Maybe<Scalars['Date']['output']>;
  isMultiple?: Maybe<Scalars['Int']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  link?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  mainId?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Scalars['ID']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['Int']['output']>;
  shootings?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  smallId?: Maybe<Scalars['ID']['output']>;
  thumbnailId?: Maybe<Scalars['ID']['output']>;
  uploadDate?: Maybe<Scalars['Date']['output']>;
  versionName?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export class Gallery {
  __typename?: 'Gallery';
  date?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  smallId: Scalars['ID']['output'];
  thumbnailId: Scalars['ID']['output'];
};

export class LoginUserInput {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export class Mutation {
  __typename?: 'Mutation';
  addUser?: Maybe<Scalars['ID']['output']>;
  assignUpload?: Maybe<Scalars['String']['output']>;
  changePwd?: Maybe<Scalars['Boolean']['output']>;
  login?: Maybe<AccessToken>;
  removeUser?: Maybe<Scalars['Boolean']['output']>;
  resetPwd?: Maybe<Scalars['Boolean']['output']>;
  throwBackendError: Scalars['Boolean']['output'];
  throwServiceError: Scalars['Boolean']['output'];
  uploadFiles?: Maybe<Array<Maybe<UploadResult>>>;
  userUpdate?: Maybe<Scalars['Boolean']['output']>;
  validateUser?: Maybe<User>;
};


export class MutationAddUserArgs {
  input: AddUserInput;
};


export class MutationAssignUploadArgs {
  input: AssignUploadInput;
};


export class MutationChangePwdArgs {
  input: ChangePwdInput;
};


export class MutationLoginArgs {
  input: LoginUserInput;
};


export class MutationRemoveUserArgs {
  input: RemoveUserInput;
};


export class MutationResetPwdArgs {
  input: ResetPwdInput;
};


export class MutationUploadFilesArgs {
  bucketName?: InputMaybe<Scalars['String']['input']>;
  files: Array<Scalars['Upload']['input']>;
};


export class MutationUserUpdateArgs {
  input: UserUpdateInput;
};


export class MutationValidateUserArgs {
  input: ValidateUserInput;
};

export class PhotoDocument {
  __typename?: 'PhotoDocument';
  _id: Scalars['ID']['output'];
  contentType: Scalars['String']['output'];
  filename: Scalars['String']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  metadata: FileMetadata;
  uploadDate: Scalars['Date']['output'];
};

export class PhotoVersion {
  __typename?: 'PhotoVersion';
  contentType?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  versionName?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export class Query {
  __typename?: 'Query';
  error?: Maybe<Array<Maybe<Error>>>;
  getAuthenticatedUser?: Maybe<UserData>;
  getFiles?: Maybe<Array<Maybe<File>>>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export class QueryGetUserArgs {
  param?: InputMaybe<UserParam>;
};

export class RemoveUserInput {
  username: Scalars['String']['input'];
};

export class ResetPwdInput {
  username: Scalars['String']['input'];
};

export class Result {
  __typename?: 'Result';
  insertedId?: Maybe<Scalars['ID']['output']>;
  insertedIds?: Maybe<Array<Scalars['ID']['output']>>;
  result?: Maybe<WriteResult>;
};

export class Status {
  __typename?: 'Status';
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  isEdited?: Maybe<Scalars['Boolean']['output']>;
  isFinalized?: Maybe<Scalars['Boolean']['output']>;
  isReviewed?: Maybe<Scalars['Boolean']['output']>;
};

export class TrainingCompleted {
  __typename?: 'TrainingCompleted';
  answer: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  result: Scalars['Int']['output'];
  time: Scalars['Date']['output'];
  type: Scalars['String']['output'];
};

export class UploadResult {
  __typename?: 'UploadResult';
  filename?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  screenshotId?: Maybe<Scalars['ID']['output']>;
  status: Scalars['String']['output'];
  thumbId?: Maybe<Scalars['ID']['output']>;
};

export class User {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isInitialPwd?: Maybe<Scalars['Boolean']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  training?: Maybe<Array<TrainingCompleted>>;
  username: Scalars['String']['output'];
};

export class UserData {
  __typename?: 'UserData';
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  roles?: Maybe<Array<Scalars['String']['output']>>;
  username: Scalars['String']['output'];
};

export class UserParam {
  username: Scalars['String']['input'];
};

export class UserUpdateInput {
  group?: InputMaybe<Scalars['String']['input']>;
  roles: Array<InputMaybe<Scalars['String']['input']>>;
  username: Scalars['String']['input'];
};

export class ValidateUserInput {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export class WriteResult {
  __typename?: 'WriteResult';
  n?: Maybe<Scalars['Int']['output']>;
  nInserted?: Maybe<Scalars['Int']['output']>;
  nModified?: Maybe<Scalars['Int']['output']>;
  nRemoved?: Maybe<Scalars['Int']['output']>;
  ok?: Maybe<Scalars['Int']['output']>;
};

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser?: string | null };

export type ChangePwdMutationVariables = Exact<{
  input: ChangePwdInput;
}>;


export type ChangePwdMutation = { __typename?: 'Mutation', changePwd?: boolean | null };

export type RemoveUserMutationVariables = Exact<{
  input: RemoveUserInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser?: boolean | null };

export type ResetPwdMutationVariables = Exact<{
  input: ResetPwdInput;
}>;


export type ResetPwdMutation = { __typename?: 'Mutation', resetPwd?: boolean | null };

export type UserUpdateMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UserUpdateMutation = { __typename?: 'Mutation', userUpdate?: boolean | null };

export type AssignUploadMutationVariables = Exact<{
  input: AssignUploadInput;
}>;


export type AssignUploadMutation = { __typename?: 'Mutation', assignUpload?: string | null };

export type UploadFilesMutationVariables = Exact<{
  files: Array<Scalars['Upload']['input']> | Scalars['Upload']['input'];
  bucketName?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadFilesMutation = { __typename?: 'Mutation', uploadFiles?: Array<{ __typename?: 'UploadResult', id?: string | null, thumbId?: string | null, screenshotId?: string | null, status: string, reason?: string | null } | null> | null };

export type GetAuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuthenticatedUserQuery = { __typename?: 'Query', getAuthenticatedUser?: { __typename?: 'UserData', id?: string | null, username: string, roles?: Array<string> | null, group?: string | null } | null };

export type GetUserQueryVariables = Exact<{
  param: UserParam;
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null, username: string, roles?: Array<string> | null, group?: string | null, createdAt: any } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id?: string | null, username: string, roles?: Array<string> | null, group?: string | null } | null> | null };

export type GetClientErrorQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientErrorQuery = { __typename?: 'Query', error?: Array<{ __typename?: 'Error', statusCode?: number | null, message?: string | null, location?: string | null, path?: string | null } | null> | null };

export type GetFilesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFilesQuery = { __typename?: 'Query', getFiles?: Array<{ __typename?: 'File', _id: string, metadata?: { __typename?: 'FileMetadata', isPublic?: boolean | null, parent?: string | null, fullId?: string | null, smallId?: string | null, thumbnailId?: string | null, height?: number | null, width?: number | null, name?: string | null, birthday?: any | null, discharge?: any | null, date?: any | null, link?: Array<string | null> | null, isFinalized?: any | null, isBilled?: any | null, billYear?: number | null, billNumber?: number | null, gallery?: Array<{ __typename?: 'Gallery', id: string, smallId: string, thumbnailId: string, date?: any | null, description?: string | null, isPublic?: boolean | null }> | null } | null } | null> | null };


export const AddUserDocument = gql`
    mutation addUser($input: AddUserInput!) {
  addUser(input: $input)
}
    `;
export type AddUserMutationFn = Apollo.MutationFunction<AddUserMutation, AddUserMutationVariables>;

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddUserMutation(baseOptions?: Apollo.MutationHookOptions<AddUserMutation, AddUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(AddUserDocument, options);
      }
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>;
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>;
export type AddUserMutationOptions = Apollo.BaseMutationOptions<AddUserMutation, AddUserMutationVariables>;
export const ChangePwdDocument = gql`
    mutation changePwd($input: ChangePwdInput!) {
  changePwd(input: $input)
}
    `;
export type ChangePwdMutationFn = Apollo.MutationFunction<ChangePwdMutation, ChangePwdMutationVariables>;

/**
 * __useChangePwdMutation__
 *
 * To run a mutation, you first call `useChangePwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePwdMutation, { data, loading, error }] = useChangePwdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangePwdMutation(baseOptions?: Apollo.MutationHookOptions<ChangePwdMutation, ChangePwdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePwdMutation, ChangePwdMutationVariables>(ChangePwdDocument, options);
      }
export type ChangePwdMutationHookResult = ReturnType<typeof useChangePwdMutation>;
export type ChangePwdMutationResult = Apollo.MutationResult<ChangePwdMutation>;
export type ChangePwdMutationOptions = Apollo.BaseMutationOptions<ChangePwdMutation, ChangePwdMutationVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($input: RemoveUserInput!) {
  removeUser(input: $input)
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const ResetPwdDocument = gql`
    mutation resetPwd($input: ResetPwdInput!) {
  resetPwd(input: $input)
}
    `;
export type ResetPwdMutationFn = Apollo.MutationFunction<ResetPwdMutation, ResetPwdMutationVariables>;

/**
 * __useResetPwdMutation__
 *
 * To run a mutation, you first call `useResetPwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPwdMutation, { data, loading, error }] = useResetPwdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPwdMutation(baseOptions?: Apollo.MutationHookOptions<ResetPwdMutation, ResetPwdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPwdMutation, ResetPwdMutationVariables>(ResetPwdDocument, options);
      }
export type ResetPwdMutationHookResult = ReturnType<typeof useResetPwdMutation>;
export type ResetPwdMutationResult = Apollo.MutationResult<ResetPwdMutation>;
export type ResetPwdMutationOptions = Apollo.BaseMutationOptions<ResetPwdMutation, ResetPwdMutationVariables>;
export const UserUpdateDocument = gql`
    mutation userUpdate($input: UserUpdateInput!) {
  userUpdate(input: $input)
}
    `;
export type UserUpdateMutationFn = Apollo.MutationFunction<UserUpdateMutation, UserUpdateMutationVariables>;

/**
 * __useUserUpdateMutation__
 *
 * To run a mutation, you first call `useUserUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userUpdateMutation, { data, loading, error }] = useUserUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserUpdateMutation(baseOptions?: Apollo.MutationHookOptions<UserUpdateMutation, UserUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserUpdateMutation, UserUpdateMutationVariables>(UserUpdateDocument, options);
      }
export type UserUpdateMutationHookResult = ReturnType<typeof useUserUpdateMutation>;
export type UserUpdateMutationResult = Apollo.MutationResult<UserUpdateMutation>;
export type UserUpdateMutationOptions = Apollo.BaseMutationOptions<UserUpdateMutation, UserUpdateMutationVariables>;
export const AssignUploadDocument = gql`
    mutation assignUpload($input: AssignUploadInput!) {
  assignUpload(input: $input)
}
    `;
export type AssignUploadMutationFn = Apollo.MutationFunction<AssignUploadMutation, AssignUploadMutationVariables>;

/**
 * __useAssignUploadMutation__
 *
 * To run a mutation, you first call `useAssignUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignUploadMutation, { data, loading, error }] = useAssignUploadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignUploadMutation(baseOptions?: Apollo.MutationHookOptions<AssignUploadMutation, AssignUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignUploadMutation, AssignUploadMutationVariables>(AssignUploadDocument, options);
      }
export type AssignUploadMutationHookResult = ReturnType<typeof useAssignUploadMutation>;
export type AssignUploadMutationResult = Apollo.MutationResult<AssignUploadMutation>;
export type AssignUploadMutationOptions = Apollo.BaseMutationOptions<AssignUploadMutation, AssignUploadMutationVariables>;
export const UploadFilesDocument = gql`
    mutation uploadFiles($files: [Upload!]!, $bucketName: String) {
  uploadFiles(files: $files, bucketName: $bucketName) {
    id
    thumbId
    screenshotId
    status
    reason
  }
}
    `;
export type UploadFilesMutationFn = Apollo.MutationFunction<UploadFilesMutation, UploadFilesMutationVariables>;

/**
 * __useUploadFilesMutation__
 *
 * To run a mutation, you first call `useUploadFilesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFilesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFilesMutation, { data, loading, error }] = useUploadFilesMutation({
 *   variables: {
 *      files: // value for 'files'
 *      bucketName: // value for 'bucketName'
 *   },
 * });
 */
export function useUploadFilesMutation(baseOptions?: Apollo.MutationHookOptions<UploadFilesMutation, UploadFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFilesMutation, UploadFilesMutationVariables>(UploadFilesDocument, options);
      }
export type UploadFilesMutationHookResult = ReturnType<typeof useUploadFilesMutation>;
export type UploadFilesMutationResult = Apollo.MutationResult<UploadFilesMutation>;
export type UploadFilesMutationOptions = Apollo.BaseMutationOptions<UploadFilesMutation, UploadFilesMutationVariables>;
export const GetAuthenticatedUserDocument = gql`
    query getAuthenticatedUser {
  getAuthenticatedUser {
    id
    username
    roles
    group
  }
}
    `;

/**
 * __useGetAuthenticatedUserQuery__
 *
 * To run a query within a React component, call `useGetAuthenticatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthenticatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthenticatedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthenticatedUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>(GetAuthenticatedUserDocument, options);
      }
export function useGetAuthenticatedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>(GetAuthenticatedUserDocument, options);
        }
export function useGetAuthenticatedUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>(GetAuthenticatedUserDocument, options);
        }
export type GetAuthenticatedUserQueryHookResult = ReturnType<typeof useGetAuthenticatedUserQuery>;
export type GetAuthenticatedUserLazyQueryHookResult = ReturnType<typeof useGetAuthenticatedUserLazyQuery>;
export type GetAuthenticatedUserSuspenseQueryHookResult = ReturnType<typeof useGetAuthenticatedUserSuspenseQuery>;
export type GetAuthenticatedUserQueryResult = Apollo.QueryResult<GetAuthenticatedUserQuery, GetAuthenticatedUserQueryVariables>;
export const GetUserDocument = gql`
    query getUser($param: UserParam!) {
  getUser(param: $param) {
    id
    username
    roles
    group
    createdAt
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      param: // value for 'param'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers {
  getUsers {
    id
    username
    roles
    group
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetClientErrorDocument = gql`
    query GetClientError {
  error @client {
    statusCode
    message
    location
    path
  }
}
    `;

/**
 * __useGetClientErrorQuery__
 *
 * To run a query within a React component, call `useGetClientErrorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientErrorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientErrorQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClientErrorQuery(baseOptions?: Apollo.QueryHookOptions<GetClientErrorQuery, GetClientErrorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClientErrorQuery, GetClientErrorQueryVariables>(GetClientErrorDocument, options);
      }
export function useGetClientErrorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClientErrorQuery, GetClientErrorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClientErrorQuery, GetClientErrorQueryVariables>(GetClientErrorDocument, options);
        }
export function useGetClientErrorSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClientErrorQuery, GetClientErrorQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClientErrorQuery, GetClientErrorQueryVariables>(GetClientErrorDocument, options);
        }
export type GetClientErrorQueryHookResult = ReturnType<typeof useGetClientErrorQuery>;
export type GetClientErrorLazyQueryHookResult = ReturnType<typeof useGetClientErrorLazyQuery>;
export type GetClientErrorSuspenseQueryHookResult = ReturnType<typeof useGetClientErrorSuspenseQuery>;
export type GetClientErrorQueryResult = Apollo.QueryResult<GetClientErrorQuery, GetClientErrorQueryVariables>;
export const GetFilesDocument = gql`
    query getFiles {
  getFiles {
    _id
    metadata {
      isPublic
      parent
      fullId
      smallId
      thumbnailId
      height
      width
      gallery {
        id
        smallId
        thumbnailId
        date
        description
        isPublic
      }
      name
      birthday
      discharge
      date
      link
      isFinalized
      isBilled
      billYear
      billNumber
    }
  }
}
    `;

/**
 * __useGetFilesQuery__
 *
 * To run a query within a React component, call `useGetFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFilesQuery(baseOptions?: Apollo.QueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
      }
export function useGetFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
        }
export function useGetFilesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilesQuery, GetFilesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilesQuery, GetFilesQueryVariables>(GetFilesDocument, options);
        }
export type GetFilesQueryHookResult = ReturnType<typeof useGetFilesQuery>;
export type GetFilesLazyQueryHookResult = ReturnType<typeof useGetFilesLazyQuery>;
export type GetFilesSuspenseQueryHookResult = ReturnType<typeof useGetFilesSuspenseQuery>;
export type GetFilesQueryResult = Apollo.QueryResult<GetFilesQuery, GetFilesQueryVariables>;