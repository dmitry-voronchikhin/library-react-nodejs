import '@testing-library/jest-dom';
import React, { createContext } from 'react';
import { render } from '@testing-library/react';
import { makeAutoObservable } from 'mobx';

import { MainLayout } from '../MainLayout';

class Store {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(state: boolean) {
    this.isAuth = state;
  }

  async login() {
    jest.fn();
  }

  checkAuth(): boolean {
    return true;
  }

  async refreshToken() {
    jest.fn();
  }

  async logout() {
    jest.fn();
  }
}

const store = new Store();

const Context = createContext<{ store: Store }>({ store });

describe('<MainLayout>', () => {
  test('should match MainLayout to snapshot', () => {
    const mainLayout = render(
      <Context.Provider value={{ store }}>
        <MainLayout>Какой-то контент</MainLayout>
      </Context.Provider>,
    );

    expect(mainLayout).toMatchSnapshot();
  });
});
