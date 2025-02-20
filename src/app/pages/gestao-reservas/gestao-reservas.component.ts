import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Reserva } from '../../interfaces/reserva.interface';
import { ReservaService } from '../../services/reserva.service';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { CadastroReservaComponent } from '../cadastro-reserva/cadastro-reserva.component';

@Component({
  selector: 'app-gestao-reservas',
  templateUrl: './gestao-reservas.component.html',
  imports: [MaterialModule, MatButtonModule, DatePipe],
  standalone: true,
  styleUrls: ['./gestao-reservas.component.css'],
})

export class GestaoReservasComponent implements OnInit {

  constructor(private reservaService: ReservaService, private router: Router) { }

  ngOnInit() {
    this.carregarReservas()
  }

  displayedColumns: string[] = ['espaco', 'solicitante', 'periodo', 'participantes', 'status', 'acoes'];

  getStatusColor(status: string): string{
    switch (status.toUpperCase()) {
      case 'APROVADA':
        return 'primary';
      case 'PENDENTE':
        return 'warn';
      case 'CANCELADA':
        return 'warn';
      default:
        return 'accent';
    }
  }

  reservas: Reserva[] = [];

  cancelarReserva(_t78: any) {
    throw new Error('Method not implemented.');
  }
  editarReserva(_t78: any) {
    throw new Error('Method not implemented.');
  }
  novaReserva() {
    this.router.navigate(['/cadastro-reserva'])
  }

  carregarReservas(){
    this.reservaService.obterReservas().subscribe({
      next: (data) => {
        console.log(data)
        this.reservas = data;
      },
      error: (error) => {
        console.error('erro ao carregar reservas:', error)
      }
    });
  }

}
