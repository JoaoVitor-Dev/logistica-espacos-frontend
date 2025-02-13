import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { routes } from '../../app.routes';

export interface Espaco {
  nome: string;
  tipo: string;
  capacidade: number;
  situacao: string;
  localizacao: string;
}

@Component({
  selector: 'app-gestao-espacos',
  templateUrl: './gestao-espacos.component.html',
  styleUrls: ['./gestao-espacos.component.css'],
  standalone: true,
  imports: [MaterialModule]
})
export class GestaoEspacosComponent {
 

  displayedColumns: string[] = ['nome', 'tipo', 'capacidade', 'situacao', 'localizacao', 'acoes'];

  espacos: Espaco[] = [
    { nome: 'Auditório Principal', tipo: 'Auditório', capacidade: 200, situacao: 'Ativo', localizacao: 'Bloco A, Térreo' },
    { nome: 'Lab. Informática', tipo: 'Laboratório', capacidade: 30, situacao: 'Manutenção', localizacao: 'Bloco B, 2º Andar' }
  ];

  getSituacaoColor(situacao: string): string {
    switch (situacao) {
      case 'Ativo':
        return 'primary';
      case 'Manutenção':
        return 'warn';
      default:
        return 'accent';
    }
  }

  novoEspaco() {
   // routes.navigate(['/cadastro-espaco']);
  }

  editarEspaco(espaco: Espaco) {
    console.log("Editando:", espaco);
  }

  excluirEspaco(espaco: Espaco) {
    console.log("Excluindo:", espaco);
  }
}
