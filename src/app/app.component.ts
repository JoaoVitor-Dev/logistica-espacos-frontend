import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestaoEspacosComponent } from './pages/gestao-espacos/gestao-espacos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GestaoEspacosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'logistica-espacos-frontend';
}
