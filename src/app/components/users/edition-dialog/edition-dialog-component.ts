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
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';

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
    MatNativeDateModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatHint,
    MatDatepicker,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    ReactiveFormsModule,
    MatIcon,
    MatSuffix,
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
    const data = {
      name: this.form.value.name || '',
      description: this.form.value.description || '',
      birthdate: this.form.value.birthdate ? this.form.value.birthdate.getTime() : Date.now(),
    };

    this.usersService.update(this.data.user.id, data).then(() => {
      this.dialog.closeAll();
    });
  }
}
