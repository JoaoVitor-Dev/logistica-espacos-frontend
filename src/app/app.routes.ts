import { Routes } from '@angular/router';
import { GestaoEspacosComponent } from './pages/gestao-espacos/gestao-espacos.component';
import { CadastroEspacoComponent } from './pages/cadastro-espaco/cadastro-espaco.component';

export const routes: Routes = [
  { path: 'gestao-espacos', component: GestaoEspacosComponent },
  { path: 'cadastro-espaco', component: CadastroEspacoComponent },
  { path: '', redirectTo: '/gestao-espacos', pathMatch: 'full' } // Redireciona para a página principal
];
