import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons'; 
import { add } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {

  pets: any[] = []; // Aqui guardaremos a lista de pets
  
  // URL base do Django (para completar o link das fotos)
  baseUrl = 'http://127.0.0.1:8000'; 
  
  // URL da API de listagem
  apiUrl = this.baseUrl + '/pets/api/listar/';

  constructor(private http: HttpClient, private router: Router) {
    addIcons({ add });
  }

  ionViewWillEnter() {
    this.buscarPets();
  }

  ngOnInit() {}

buscarPets() {
    const meuId = localStorage.getItem('user_id');

    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (dados) => {
        this.pets = dados.filter(pet => pet.usuario != meuId);
        
        console.log("Pets filtrados:", this.pets);
      },
      error: (erro) => {
        console.error("Erro ao buscar pets:", erro);
      }
    });
  }

  // Função para arrumar o link da foto
  ajustarImagem(caminhoFoto: string): string {
    if (!caminhoFoto) return ''; // Se não tiver foto, retorna vazio
    if (caminhoFoto.startsWith('http')) return caminhoFoto; // Se já for completo, mantém
    return this.baseUrl + caminhoFoto; // Se for relativo, cola o endereço do servidor
  }

  logout() {
    // Limpa o ID salvo e volta pro login
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}