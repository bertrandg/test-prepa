import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {UsersService} from '../../../services/users.service';

@Component({
  selector: 'app-edition-dialog',
  imports: [
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './edition-dialog-component.html',
})
export class EditionDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  usersService = inject(UsersService);

}
