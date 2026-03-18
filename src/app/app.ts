import {Component, signal} from '@angular/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input'

@Component({
  selector: 'app-root',
  imports: [
    MatSlideToggle,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('activate me');
  displayForm = signal(false);
}
