import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EspacoService } from '../../services/espaco.service';
import { Espaco } from '../../interfaces/espaco.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestao-espacos',
  templateUrl: './gestao-espacos.component.html',
  styleUrls: ['./gestao-espacos.component.css'],
  standalone: true,
  imports: [MaterialModule]
})

export class GestaoEspacosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'tipo', 'capacidade', 'situacao', 'localizacao', 'acoes'];
  espacos: Espaco[] = [];

  constructor(
    private espacoService: EspacoService, 
    private router: Router  
  ) {}

  ngOnInit() {
    this.loadEspacos();
  }

  loadEspacos() {
    this.espacoService.obterEspacos().subscribe({
      next: (data) => {
        console.log(data)
        this.espacos = data;
      },
      error: (error) => {
        console.error('Error fetching espacos:', error);
      }
    });
  }

  getSituacaoColor(situacao: string): string {
    switch (situacao.toUpperCase()) {
      case 'ATIVO':
        return 'primary';
      case 'MANUTENCAO':
        return 'warn';
      default:
        return 'accent';
    }
  }

  novoEspaco() {
    this.router.navigate(['/cadastro-espaco']);
  }

  editarEspaco(espaco: Espaco) {
    this.espacoService.atualizarEspaco(espaco).subscribe({
      next: (response) => {
        console.log('Espaco updated:', response);
        this.loadEspacos();
      },
      error: (error) => {
        console.error('Error updating espaco:', error);
      }
    });
  }

  excluirEspaco(espaco: Espaco) {
    this.espacoService.deletarEspaco(espaco.id).subscribe({
      next: () => {
        console.log('Espaco deleted');
        this.loadEspacos();
      },
      error: (error) => {
        console.error('Error deleting espaco:', error);
      }
    });
  }
}