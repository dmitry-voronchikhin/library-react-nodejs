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

export type Book = {
  __typename?: 'Book';
  author?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publishingHouse?: Maybe<PublishingHouse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
};

export type MutationAddBookArgs = {
  author?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  publishingHouseId?: InputMaybe<Scalars['String']>;
};

export type PublishingHouse = {
  __typename?: 'PublishingHouse';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAllBooks?: Maybe<Array<Maybe<Book>>>;
  getAllPublishingHouses?: Maybe<Array<Maybe<PublishingHouse>>>;
};

export type AddBookMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  author?: InputMaybe<Scalars['String']>;
  publishingHouseId?: InputMaybe<Scalars['String']>;
}>;

export type AddBookMutation = {
  __typename?: 'Mutation';
  addBook?: {
    __typename?: 'Book';
    name?: string | null;
    author?: string | null;
  } | null;
};

export type GetAllBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBooksQuery = {
  __typename?: 'Query';
  getAllBooks?: Array<{
    __typename?: 'Book';
    author?: string | null;
    id?: string | null;
    name?: string | null;
    publishingHouse?: {
      __typename?: 'PublishingHouse';
      name?: string | null;
    } | null;
  } | null> | null;
};

export type GetAllPublishingHousesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetAllPublishingHousesQuery = {
  __typename?: 'Query';
  getAllPublishingHouses?: Array<{
    __typename?: 'PublishingHouse';
    id?: string | null;
    name?: string | null;
    address?: string | null;
  } | null> | null;
};
