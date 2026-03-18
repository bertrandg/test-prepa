import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  httpClient = inject(HttpClient);

  isLoading = signal(false);
  users = signal<Array<IUser>>([]);

  loadAll() {
        this.isLoading.set(true);
    return this.httpClient.get<Array<IUser>>('https://jsonplaceholder.typicode.com/todos/1').pipe(
      catchError((err) => of([
        {name: 'nameA', email: 'emailA', description: 'descA', birthdate: Date.now()-1515555},
        {name: 'nameB', email: 'emailB', description: 'descB', birthdate: Date.now()-9465656565},
        {name: 'nameC', email: 'emailC', description: 'descC', birthdate: Date.now()-545454555},
      ])),
      tap(users => {
        this.users.set(users);
        this.isLoading.set(false);
      })
    );
  }

  create(user: IUser) {
    return this.httpClient.post('https://jsonplaceholder.typicode.com/todos', user);
  }

  update() {
    return this.httpClient.put('https://jsonplaceholder.typicode.com/todos/1', {
      title: 'foo',
      body: 'bar',
    })
  }

  delete() {
    return this.httpClient.delete('https://jsonplaceholder.typicode.com/todos/1');
  }

}
