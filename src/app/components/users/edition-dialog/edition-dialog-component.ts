import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {UsersService} from '../../../services/users.service';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-edition-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatHint,
    MatDatepicker,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './edition-dialog-component.html',
})
export class EditionDialogComponent implements OnInit {
  dialog = inject(MatDialog);
  data: { user: IUser } = inject(MAT_DIALOG_DATA);
  usersService = inject(UsersService);

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    description: new FormControl('', [
      Validators.maxLength(500)
    ]),
    birthdate: new FormControl<Date>(new Date, [
      Validators.required
    ])
  });

  ngOnInit() {
    this.form.patchValue({
      name: this.data.user.name,
      description: this.data.user.description,
      birthdate: new Date(this.data.user.birthdate),
    });
  }

  update() {
    if (this.form.invalid) {
      return;
    }

    this.usersService.update(this.data.user.id, this.data.user).then(() => {
      this.dialog.closeAll();
    });
  }
}
