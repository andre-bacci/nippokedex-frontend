import { Component } from '@angular/core';
import { HomeComponent } from '@app/components/home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  template: `
    <main>
      <div class="container">
        <app-home />
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
