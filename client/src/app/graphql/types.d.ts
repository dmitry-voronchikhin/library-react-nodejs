export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddBookInput = {
  author?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  publishingHouseId?: InputMaybe<Scalars['String']>;
};

export type AddBookOutput = {
  __typename?: 'AddBookOutput';
  book?: Maybe<Book>;
  result?: Maybe<ResultStatus>;
};

export type AddPublishingHouseInput = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type AddPublishingHouseOutput = {
  __typename?: 'AddPublishingHouseOutput';
  publishingHouse?: Maybe<PublishingHouse>;
  result?: Maybe<ResultStatus>;
};

export type AddReaderInput = {
  __typename?: 'AddReaderInput';
  address?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type AddReaderOutput = {
  __typename?: 'AddReaderOutput';
  reader?: Maybe<Reader>;
  result?: Maybe<ResultStatus>;
};

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publishingHouse?: Maybe<PublishingHouse>;
};

export type GetAllBooksInput = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type GetAllBooksOutput = {
  __typename?: 'GetAllBooksOutput';
  books?: Maybe<Array<Maybe<Book>>>;
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type GetAllPublishingHousesOutput = {
  __typename?: 'GetAllPublishingHousesOutput';
  publishingHouses?: Maybe<Array<Maybe<PublishingHouse>>>;
};

export type GetAllReadersInput = {
  __typename?: 'GetAllReadersInput';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
};

export type GetAllReadersOutput = {
  __typename?: 'GetAllReadersOutput';
  count?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  readers?: Maybe<Array<Maybe<Reader>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<AddBookOutput>;
  addPublishingHouse?: Maybe<AddPublishingHouseOutput>;
  addReader?: Maybe<AddReaderOutput>;
  removeBook?: Maybe<RemoveBookOutput>;
  removePublishingHouse?: Maybe<RemovePublishingHouseOutput>;
  removeReader?: Maybe<RemoveReaderOutput>;
  updateReader?: Maybe<UpdateReaderOutput>;
};

export type MutationAddBookArgs = {
  author?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  publishingHouseId?: InputMaybe<Scalars['String']>;
};

export type MutationAddPublishingHouseArgs = {
  address?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type MutationAddReaderArgs = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationRemoveBookArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type MutationRemovePublishingHouseArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type MutationRemoveReaderArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type MutationUpdateReaderArgs = {
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type PublishingHouse = {
  __typename?: 'PublishingHouse';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllBooks?: Maybe<GetAllBooksOutput>;
  getAllPublishingHouses?: Maybe<GetAllPublishingHousesOutput>;
  getAllReaders?: Maybe<GetAllReadersOutput>;
};

export type QueryGetAllBooksArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type QueryGetAllReadersArgs = {
  count?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Reader = {
  __typename?: 'Reader';
  address?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  books?: Maybe<Array<Maybe<Book>>>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type RemoveBookInput = {
  __typename?: 'RemoveBookInput';
  id?: Maybe<Scalars['String']>;
};

export type RemoveBookOutput = {
  __typename?: 'RemoveBookOutput';
  book?: Maybe<Book>;
  result?: Maybe<ResultStatus>;
};

export type RemovePublishingHouseInput = {
  __typename?: 'RemovePublishingHouseInput';
  id?: Maybe<Scalars['String']>;
};

export type RemovePublishingHouseOutput = {
  __typename?: 'RemovePublishingHouseOutput';
  publishingHouse?: Maybe<PublishingHouse>;
  result?: Maybe<ResultStatus>;
};

export type RemoveReaderInput = {
  __typename?: 'RemoveReaderInput';
  id?: Maybe<Scalars['String']>;
};

export type RemoveReaderOutput = {
  __typename?: 'RemoveReaderOutput';
  reader?: Maybe<Reader>;
  result?: Maybe<ResultStatus>;
};

export type ResultStatus = {
  __typename?: 'ResultStatus';
  status?: Maybe<ResultStatusEnum>;
};

export const enum ResultStatusEnum {
  Error = 'ERROR',
  Ok = 'OK',
}

export type UpdateReaderInput = {
  __typename?: 'UpdateReaderInput';
  address?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UpdateReaderOutput = {
  __typename?: 'UpdateReaderOutput';
  reader?: Maybe<Reader>;
  result?: Maybe<ResultStatus>;
};

export type AddBookMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  publishingHouseId?: InputMaybe<Scalars['String']>;
}>;

export type AddBookMutation = {
  __typename?: 'Mutation';
  addBook?: {
    __typename?: 'AddBookOutput';
    book?: {
      __typename?: 'Book';
      name?: string | null;
      author?: string | null;
    } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type AddPublishingHouseMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
}>;

export type AddPublishingHouseMutation = {
  __typename?: 'Mutation';
  addPublishingHouse?: {
    __typename?: 'AddPublishingHouseOutput';
    publishingHouse?: {
      __typename?: 'PublishingHouse';
      name?: string | null;
    } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type AddReaderMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
}>;

export type AddReaderMutation = {
  __typename?: 'Mutation';
  addReader?: {
    __typename?: 'AddReaderOutput';
    reader?: {
      __typename?: 'Reader';
      name?: string | null;
      birthDate?: string | null;
    } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type RemoveBookMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;

export type RemoveBookMutation = {
  __typename?: 'Mutation';
  removeBook?: {
    __typename?: 'RemoveBookOutput';
    book?: { __typename?: 'Book'; name?: string | null } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type RemovePublishingHouseMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;

export type RemovePublishingHouseMutation = {
  __typename?: 'Mutation';
  removePublishingHouse?: {
    __typename?: 'RemovePublishingHouseOutput';
    publishingHouse?: {
      __typename?: 'PublishingHouse';
      name?: string | null;
    } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type RemoveReaderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;

export type RemoveReaderMutation = {
  __typename?: 'Mutation';
  removeReader?: {
    __typename?: 'RemoveReaderOutput';
    reader?: { __typename?: 'Reader'; name?: string | null } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type UpdateReaderMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  birthDate?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
}>;

export type UpdateReaderMutation = {
  __typename?: 'Mutation';
  updateReader?: {
    __typename?: 'UpdateReaderOutput';
    reader?: { __typename?: 'Reader'; name?: string | null } | null;
    result?: {
      __typename?: 'ResultStatus';
      status?: ResultStatusEnum | null;
    } | null;
  } | null;
};

export type GetAllBooksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  count?: InputMaybe<Scalars['Int']>;
}>;

export type GetAllBooksQuery = {
  __typename?: 'Query';
  getAllBooks?: {
    __typename?: 'GetAllBooksOutput';
    count?: number | null;
    books?: Array<{
      __typename?: 'Book';
      author?: string | null;
      id?: string | null;
      name?: string | null;
      publishingHouse?: {
        __typename?: 'PublishingHouse';
        name?: string | null;
      } | null;
    } | null> | null;
  } | null;
};

export type GetAllPublishingHousesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllPublishingHousesQuery = {
  __typename?: 'Query';
  getAllPublishingHouses?: {
    __typename?: 'GetAllPublishingHousesOutput';
    publishingHouses?: Array<{
      __typename?: 'PublishingHouse';
      id?: string | null;
      name?: string | null;
      address?: string | null;
    } | null> | null;
  } | null;
};

export type GetAllReadersQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  count?: InputMaybe<Scalars['Int']>;
}>;

export type GetAllReadersQuery = {
  __typename?: 'Query';
  getAllReaders?: {
    __typename?: 'GetAllReadersOutput';
    count?: number | null;
    readers?: Array<{
      __typename?: 'Reader';
      id?: string | null;
      name?: string | null;
      address?: string | null;
      phoneNumber?: string | null;
      birthDate?: string | null;
      books?: Array<{
        __typename?: 'Book';
        id?: string | null;
        name?: string | null;
      } | null> | null;
    } | null> | null;
  } | null;
};
