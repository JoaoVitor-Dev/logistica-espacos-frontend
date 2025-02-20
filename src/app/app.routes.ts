import { Routes } from '@angular/router';
import { CadastroEspacoComponent } from './pages/cadastro-espaco/cadastro-espaco.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CadastroReservaComponent } from './pages/cadastro-reserva/cadastro-reserva.component';

export const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'cadastro-espaco', component: CadastroEspacoComponent },
  { path: 'cadastro-espaco/:id', component: CadastroEspacoComponent },
  { path: 'cadastro-reserva', component: CadastroReservaComponent },
  { path: 'cadastro-reserva/:id', component: CadastroReservaComponent }
];
