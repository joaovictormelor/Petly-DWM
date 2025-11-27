import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonChip, IonLabel, IonList, IonListHeader, IonItem, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { locationOutline, callOutline, mailOutline, paw } from 'ionicons/icons';


@Component({
  selector: 'app-detalhes-pet',
  templateUrl: './detalhes-pet.page.html',
  styleUrls: ['./detalhes-pet.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonChip, IonLabel, IonList, IonListHeader, IonItem, IonIcon, CommonModule, FormsModule]
})
export class DetalhesPetPage implements OnInit {

  pet: any = null;
  baseUrl = 'http://127.0.0.1:8000'; // Ajuste o IP se for Android físico

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { 
    addIcons({ locationOutline, callOutline, mailOutline, paw });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.http.get(this.baseUrl + '/pets/api/detalhes/' + id + '/').subscribe({
      next: (dados) => {
        this.pet = dados;
      },
      error: (erro) => {
        console.error("Erro ao carregar pet", erro);
      }
    });
  }

  ajustarImagem(caminhoFoto: string): string {
    if (!caminhoFoto) return '';
    if (caminhoFoto.startsWith('http')) return caminhoFoto;
    return this.baseUrl + caminhoFoto;
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}