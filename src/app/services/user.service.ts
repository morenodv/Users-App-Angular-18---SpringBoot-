import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User[] = [
    {
      id: 1,
      name: 'Jesus',
      lastname: 'Moreno',
      email: 'jesusmoreno@email.com',
      username: 'Mmmmmmmmmmm',
      password: '123456789',
    },
    {
      id: 2,
      name: 'Eduardo',
      lastname: 'Larios',
      email: 'eduardo@email.com',
      username: 'Eeeeeeeee',
      password: '123456789',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]> {
    return of(this.user);
  }
}


