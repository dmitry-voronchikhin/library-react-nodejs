import { makeAutoObservable } from 'mobx';

import { userRequest } from '@api/user/user.request';
import { tokenRequest } from '@api/user/token.request';

export class Store {
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(state: boolean) {
    this.isAuth = state;
  }

  async login(email: string, password: string) {
    try {
      const response = await userRequest.login(email, password);
      sessionStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
    } catch {
      this.setAuth(false);
    }
  }

  checkAuth() {
    if (sessionStorage.getItem('token')) {
      this.setAuth(true);
      return;
    }

    this.setAuth(false);
  }

  async refreshToken() {
    try {
      const tokens = await tokenRequest.refresh();
      sessionStorage.setItem('token', tokens.data.accessToken);
    } catch {
      this.setAuth(false);
    }
  }

  async logout() {
    await userRequest.logout();
    sessionStorage.clear();
    this.setAuth(false);
    location.reload();
  }
}
