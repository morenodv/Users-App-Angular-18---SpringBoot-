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
      username: 'Mm',
      password: '12345',
    },
    {
      id: 2,
      name: 'Eduardo',
      lastname: 'Larios',
      email: 'eduardo@email.com',
      username: 'Ee',
      password: '123450',
    },
  ];

  constructor() {}

  findAll(): Observable<User[]> {
    return of(this.user);
  }
}


