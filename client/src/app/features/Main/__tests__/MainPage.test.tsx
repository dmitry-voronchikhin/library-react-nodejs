import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React, { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

import { Main } from '../Main';

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
        <Main />
      </Context.Provider>,
    );

    expect(mainPage).toMatchSnapshot();
  });
});
