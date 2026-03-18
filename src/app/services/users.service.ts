import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, of, tap} from 'rxjs';
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
    return firstValueFrom(this.httpClient.get<IUser[]>('https://jsonplaceholder.typicode.com/todosXX').pipe(
      catchError(() => of(this.users().length ? this.users() : [
        {
          id: 1,
          name: 'nameA',
          email: 'emailA',
          description: 'descA skdjfkdsj hgkjdsg hkjdsg hjkdsg hjkdgh kjdsg hkdjsgh jkdfh lkfgjhilfdgihjdruih sdkjg dfgh udfgku drukrgh drkugh udkrhg kudhg ukdrhguk dkufhg ',
          birthdate: Date.now() - 1515555000000
        },
        {
          id: 2,
          name: 'nameB',
          email: 'emailB',
          description: 'descB xcvlkxcuvkg hdkufg hkucvbh kucvbhvu gbycv jygcvjg vyjbcvjygb gyjvc gjyvcgjyvcg jyvcg yjvcgjyvcg cvjy cgjy gcyjv gyjcvgcjyvgjvcy',
          birthdate: Date.now() - 946565656500
        },
        {
          id: 3,
          name: 'nameC',
          email: 'emailC',
          description: 'descC kdvkjxcvudsguvy tuystyust yusyus fuydysuftdsuyft dsyu ftusd ytsduy tsduy tuysdyu ftsduydstuyg gyustuydyutsduytdsuytdsfuy sytu tuystyusuytsuy',
          birthdate: Date.now() - 545454555000
        },
      ])),
      tap(users => {
        this.users.set(users);
        this.isLoading.set(false);
      })
    ));
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
