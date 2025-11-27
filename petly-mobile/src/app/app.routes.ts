import { Routes } from '@angular/router';

export const routes: Routes = [
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
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      {
        path: 'meus-pets',
        loadComponent: () => import('./meus-pets/meus-pets.page').then( m => m.MeusPetsPage)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
 
  {
    path: 'cadastrar-pet',
    loadComponent: () => import('./cadastrar-pet/cadastrar-pet.page').then( m => m.CadastrarPetPage)
  },
  {
    path: 'detalhes-pet/:id',
    loadComponent: () => import('./detalhes-pet/detalhes-pet.page').then( m => m.DetalhesPetPage)
  },
  {
    path: 'editar-pet/:id',
    loadComponent: () => import('./editar-pet/editar-pet.page').then( m => m.EditarPetPage)
  },

];