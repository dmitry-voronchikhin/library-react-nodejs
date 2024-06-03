import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

import { MainPage } from '../MainPage';

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

describe('<MainPage>', () => {
  test('should match MainPage to snapshot', () => {
    const mainPage = render(
      <Context.Provider value={{ store }}>
        <MainPage />
      </Context.Provider>,
    );

    expect(mainPage).toMatchSnapshot();
  });
});
