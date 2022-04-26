import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, ReplaySubject } from 'rxjs';
import { User } from 'src/app/_models/User.model';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:7153/api/';
  private currentUserSource = new ReplaySubject<User | null>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'Account/login', model)
                .pipe(
                  map(res => {
                     const user: User = res;
                     localStorage.setItem('user', JSON.stringify(user));
                     this.currentUserSource.next(user);
                  })
                );
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'Account/register', model)
                .pipe(
                  map(res => {
                     const user: User = res;
                     localStorage.setItem('user', JSON.stringify(user));
                     this.currentUserSource.next(user);
                  })
                );
  }
}
