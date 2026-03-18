import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, firstValueFrom, map, of, tap} from 'rxjs';
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
      return Promise.reject();
    }

    this.isLoading.set(true);
    return firstValueFrom(this.httpClient.get<IUser[]>('https://test.com/xxx').pipe(
      catchError(() => of(this.users().length ? this.users() : MOCK_USERS)),
      tap(users => {
        this.users.set(users);
        this.isLoading.set(false);
      }),
      map(() => null)
    ));
  }

  create(user: Omit<IUser, 'id'>) {
    if (this.isLoading()) {
      return Promise.reject();
    }

    this.isLoading.set(true);
    return firstValueFrom(this.httpClient.post('https://test.com/xxx', user).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => ([...users, {id: random(100, 100_000), ...user}]));
        this.isLoading.set(false);
      }),
      map(() => null)
    ));
  }

  update(id: number, user: Partial<IUser>) {
    if (this.isLoading()) {
      return Promise.reject();
    }

    this.isLoading.set(true);
    return firstValueFrom(this.httpClient.put(`https://test.com/xxx/${id}`, user).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => users.map(u => u.id === id ? {...u, ...user} : u));
        this.isLoading.set(false);
      }),
      map(() => null)
    ));
  }

  delete(id: number) {
    if (this.isLoading()) {
      return Promise.reject();
    }

    this.isLoading.set(true);
    return firstValueFrom(this.httpClient.delete(`https://test.com/xxx/${id}`).pipe(
      catchError(() => of(null)),
      tap(() => {
        this.users.update(users => users.filter(user => user.id !== id))
        this.isLoading.set(false);
      }),
      map(() => null)
    ));
  }
}

const MOCK_USERS: IUser[] = [
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
]
