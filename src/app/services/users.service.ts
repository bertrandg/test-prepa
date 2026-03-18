import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';
import {random} from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);

  isLoading = signal(false);
  users = signal<IUser[]>([]);

  loadAll() {
    if (this.isLoading()) {
      return
    }

    this.isLoading.set(true);
    return this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/todos/1').pipe(
      catchError(() => of([
        {id: 1, name: 'nameA', email: 'emailA', description: 'descA', birthdate: Date.now() - 1515555},
        {id: 2, name: 'nameB', email: 'emailB', description: 'descB', birthdate: Date.now() - 9465656565},
        {id: 3, name: 'nameC', email: 'emailC', description: 'descC', birthdate: Date.now() - 545454555},
      ])),
      tap(users => {
        this.users.set(users);
        this.isLoading.set(false);
      })
    );
  }

  create(user: Omit<IUser, 'id'>) {
    if (this.isLoading()) {
      return
    }

    this.isLoading.set(true);
    return this.httpClient.post('https://jsonplaceholder.typicode.com/todos', user).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => ([...users, {id: random(100, 100_000), ...user}]));
        this.isLoading.set(false);
      })
    );
  }

  update(id: number, user: Omit<IUser, 'id'>) {
    if (this.isLoading()) {
      return
    }

    this.isLoading.set(true);
    return this.httpClient.put(`https://jsonplaceholder.typicode.com/todos/${id}`, user).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => users.map(user => user.id === id ? {...user, ...user} : user));
        this.isLoading.set(false);
      })
    );
  }

  delete(id: number) {
    if (this.isLoading()) {
      return
    }

    this.isLoading.set(true);
    return this.httpClient.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => users.filter(user => user.id !== id))
        this.isLoading.set(false);
      })
    );
  }

}
