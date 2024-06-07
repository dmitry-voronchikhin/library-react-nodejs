import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import { EMPTY_STRING, WARNING_TITLE } from '@app/constants';
import {
  IssueBookMutation,
  IssueBookMutationVariables,
  ResultStatusEnum,
} from '@app/graphql/types.d';
import { openNotification } from '@app/utils';
import { ISSUE_BOOK } from '@app/graphql/mutations/issueBook';

type Result = {
  issueBook: ({
    readerId,
    bookId,
  }: {
    readerId: string;
    bookId: string;
  }) => void;
  isLoading: boolean;
};

export const useIssueBook = (onComplete: () => void): Result => {
  const [issueBookRequest, { loading }] = useMutation<
    IssueBookMutation,
    IssueBookMutationVariables
  >(ISSUE_BOOK);

  const issueBook = useCallback(
    ({ readerId, bookId }: { readerId: string; bookId: string }) => {
      issueBookRequest({
        variables: {
          readerId,
          bookId,
        },
        refetchQueries: ['getBooksByReader', 'getAllBooks'],
        onCompleted: (data) => {
          if (data.issueBook?.result?.status === ResultStatusEnum.Ok) {
            onComplete();
            openNotification({
              title: EMPTY_STRING,
              description: 'Книга успешно выдана',
              type: 'success',
            });
            return;
          }

          throw new Error();
        },
        onError: () => {
          openNotification({
            title: WARNING_TITLE,
            description: 'Произошла ошибка при выдаче книги читателя',
            type: 'error',
          });
        },
      });
    },
    [issueBookRequest, onComplete],
  );

  return { issueBook, isLoading: loading };
};
