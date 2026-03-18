import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatHint, MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggle,
    MatFormField,
    MatLabel,
    MatHint,
    MatInput
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('activate me');

  displayForm = signal(false);
}
