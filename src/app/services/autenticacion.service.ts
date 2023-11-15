import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor() { }

  private readonly USER_KEY = 'current_user';

  public get currentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public set currentUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public get isUserLoggedIn(): boolean {
    return !!this.currentUser;
  }

  public logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
}
