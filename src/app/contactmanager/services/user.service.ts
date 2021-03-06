import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';

import { tap } from 'rxjs/operators'

@Injectable()
export class UserService {

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[]
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }


  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  loadAll() {
    const userUrl = 'http://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(userUrl).subscribe(
      data => {
        this.dataStore.users = data;
        this._users.next(Object.assign({}, this.dataStore).users);
      },
      error => console.log('Failed to fetch users')
    )
  }

  userById(id: number): User {
    return this.dataStore.users.find(user => user.id == id)
  }

  addUser(user: User): Observable<User> {
    user.id = this.dataStore.users.length + 1;
    this.dataStore.users.push(user);
    this._users.next(Object.assign({}, this.dataStore).users);
    return of(user)
  }
}
