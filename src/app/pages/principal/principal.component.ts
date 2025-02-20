import { Component, OnInit } from '@angular/core';
import { GestaoEspacosComponent } from '../gestao-espacos/gestao-espacos.component';
import { GestaoReservasComponent } from '../gestao-reservas/gestao-reservas.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  imports: [GestaoEspacosComponent, GestaoReservasComponent],
  standalone: true
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
