import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { AddBookForm } from '../AddBookForm';
import { GET_ALL_BOOKS, GET_ALL_PUBLISHING_HOUSES } from '@app/graphql/queries';
import { ADD_BOOK } from '@app/graphql/mutations';

describe('<AddBookForm>', () => {
  const FORM_MOCKS = [
    {
      request: {
        query: ADD_BOOK,
        variables: {
          name: '11111',
          author: '11111',
          publishingHouseId: '11111',
        },
      },
      result: {
        data: {
          addBook: {
            book: {
              name: '11111',
              author: '11111',
            },
            result: {
              status: 'OK',
            },
          },
        },
      },
    },
    {
      request: {
        query: GET_ALL_PUBLISHING_HOUSES,
      },
      result: {
        data: {
          getAllPublishingHouses: {
            publishingHouses: [
              {
                id: 'e2288a4f-a663-4a5f-b0b9-768681f8f242',
                name: 'Москва',
                address: 'г. Москва',
              },
              {
                id: '52382594-d61e-40a9-9685-a0e3ed59caa6',
                name: 'Форскан',
                address: 'Ижевск, Петрова, 1',
              },
            ],
          },
        },
      },
    },
    {
      request: {
        query: GET_ALL_BOOKS,
        variables: {
          page: 1,
          count: 10,
        },
      },
      result: {
        data: {
          getAllBooks: {
            books: [
              {
                author: 'Автор 5',
                id: 'de6607c4-47e4-4122-ad5a-8cbd112c8a71',
                name: 'Книга 7',
                publishingHouse: {
                  name: 'Москва',
                },
              },
              {
                author: 'Автор 4',
                id: 'eaaf3421-053d-4ea5-ab87-6db4a1e5c097',
                name: 'Книга 4',
                publishingHouse: {
                  name: 'Москва',
                },
              },
              {
                author: 'Автор 5',
                id: 'fbf958d1-e6ed-43f9-aabe-589739aeb040',
                name: 'Книга 5',
                publishingHouse: {
                  name: 'Москва',
                },
              },
              {
                author: 'Автор 6',
                id: 'ffac3e7d-bdbd-4f46-a5ed-8702fda85094',
                name: 'Книга 6',
                publishingHouse: {
                  name: 'Москва',
                },
              },
            ],
            count: 4,
          },
        },
      },
    },
  ];

  test('should match AddBookForm to snapshot', () => {
    const addBookForm = render(
      // observable
      <MockedProvider mocks={FORM_MOCKS} addTypename={false}>
        <AddBookForm />
      </MockedProvider>,
      // ),
    );

    expect(addBookForm).toMatchSnapshot();
  });
});
