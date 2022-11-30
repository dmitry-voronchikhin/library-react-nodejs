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
  publishingHouse?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook?: Maybe<Book>;
};

export type MutationAddBookArgs = {
  request?: InputMaybe<AddBookInput>;
};

export type Query = {
  __typename?: 'Query';
  getAllBooks?: Maybe<Array<Maybe<Book>>>;
};

export type GetAllBooksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBooksQuery = {
  __typename?: 'Query';
  getAllBooks?: Array<{
    __typename?: 'Book';
    author?: string | null;
    id?: string | null;
    name?: string | null;
    publishingHouse?: string | null;
  } | null> | null;
};
