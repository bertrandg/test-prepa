import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatSlideToggle
  ],
  templateUrl: './home-route-component.html',
  host: {'class': 'w-full'},
})
export class HomeRouteComponent {
  title = signal('activate me');
  displayForm = signal(false);
}
