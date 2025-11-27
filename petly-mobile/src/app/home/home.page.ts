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

  pets: any[] = [];
  
  
  baseUrl = 'http://127.0.0.1:8000'; 
  

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

  ajustarImagem(caminhoFoto: string): string {
    if (!caminhoFoto) return '';
    if (caminhoFoto.startsWith('http')) return caminhoFoto;
    return this.baseUrl + caminhoFoto;
  }

  logout() {
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }
}