import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User[] = [];

  constructor(private http: HttpClient) {}

  findAll(): Observable<User[]> {
    // return of(this.user);
    return this.http.get<User[]>('http://localhost:8080/api/users');
  }
}


