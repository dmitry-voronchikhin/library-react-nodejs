import { makeAutoObservable } from 'mobx';

import { userRequest } from '@api/user/user.request';
import { User } from '@api/types';

export class Store {
  user = {} as User;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(state: boolean) {
    this.isAuth = state;
  }

  setUser(user: User) {
    this.user = user;
  }

  async login(email: string, password: string) {
    const response = await userRequest.login(email, password);
    localStorage.setItem('token', response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }
}
