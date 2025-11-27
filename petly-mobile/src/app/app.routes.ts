import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'detalhes-pet/:id',
    loadComponent: () => import('./detalhes-pet/detalhes-pet.page').then( m => m.DetalhesPetPage)
  },  {
    path: 'cadastrar-pet',
    loadComponent: () => import('./cadastrar-pet/cadastrar-pet.page').then( m => m.CadastrarPetPage)
  },


];
