import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EspacoService } from '../../services/espaco.service';
import { Espaco } from '../../interfaces/espaco.interface';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gestao-espacos',
  templateUrl: './gestao-espacos.component.html',
  styleUrls: ['./gestao-espacos.component.css'],
  standalone: true,
  imports: [MaterialModule, MatButtonModule]
})

export class GestaoEspacosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'tipo', 'capacidade', 'situacao', 'localizacao', 'acoes'];
  espacos: Espaco[] = [];

  constructor(
    private espacoService: EspacoService, 
    private router: Router,
    private dialog: MatDialog 
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
    this.router.navigate(['/cadastro-espaco', espaco.id]);;
  }

  excluirEspaco(espaco: Espaco) { 
    if (espaco.status != "INATIVO"){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
          message: 'Deseja inativar este item?'
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.espacoService.deletarEspaco(espaco.id).subscribe({
            next: () => {
              console.log('Espaço('+espaco.id+') inativado');
              this.loadEspacos();
            },
            error: (error) => {
              console.error('Erro ao inativar espaço:', error);
            }
          });
        }
      });
    }
  }
}