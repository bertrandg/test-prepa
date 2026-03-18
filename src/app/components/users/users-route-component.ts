import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {MatButton} from '@angular/material/button';
import {DisplayableDatePipe} from './displayable-date-pipe';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {EditionDialogComponent} from './edition-dialog/edition-dialog-component';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButton,
    DisplayableDatePipe,
    DatePipe
  ],
  templateUrl: './users-route-component.html',
  host: {'class': 'w-full'},
})
export class UsersRouteComponent implements OnInit {
  usersService = inject(UsersService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.usersService.loadAll();
  }

  addUser() {
    //TODO panel creation
  }

  updateUser(user: IUser) {
    this.dialog.open(EditionDialogComponent, {data: {user}});
  }

  deleteUser(id: number) {
    this.usersService.delete(id);
  }
}
