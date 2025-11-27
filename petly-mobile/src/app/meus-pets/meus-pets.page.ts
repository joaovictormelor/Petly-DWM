import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, pawOutline, createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-meus-pets',
  templateUrl: './meus-pets.page.html',
  styleUrls: ['./meus-pets.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class MeusPetsPage implements OnInit {

  meusPets: any[] = [];
  baseUrl = 'http://127.0.0.1:8000'; 

  constructor(private http: HttpClient,
    private alertController: AlertController,
    private toastController: ToastController
  ) { 
    addIcons({ add, pawOutline, createOutline, trashOutline });
  }

  ionViewWillEnter() {
    this.buscarMeusPets();
  }

  ngOnInit() {}

  buscarMeusPets() {
    // 1. Pega o ID do usuário que salvamos no Login
    const userId = localStorage.getItem('user_id');

    this.http.get<any[]>(this.baseUrl + '/pets/api/listar/').subscribe(todosPets => {
      // 2. Filtra: Só quero os pets onde 'usuario' == meu ID
      // O '==' compara número com texto sem problemas no JS
      this.meusPets = todosPets.filter(pet => pet.usuario == userId);
    });
  }

  async confirmarExclusao(pet: any) {
    const alert = await this.alertController.create({
      header: 'Tem certeza?',
      message: `Deseja excluir o pet <strong>${pet.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Excluir', 
          role: 'confirm',
          handler: () => { this.excluirPet(pet.id); } // Chama a função real
        }
      ]
    });
    await alert.present();
  }

  // 2. Manda a ordem para o Django
  excluirPet(id: number) {
    this.http.delete(this.baseUrl + '/pets/api/gerenciar/' + id + '/').subscribe({
      next: () => {
        this.exibirMensagem('Pet excluído com sucesso!');
        this.buscarMeusPets(); // Recarrega a lista para sumir o pet
      },
      error: (erro) => {
        console.error(erro);
        this.exibirMensagem('Erro ao excluir.', 'danger');
      }
    });
  }

  ajustarImagem(caminho: string) {
    if(!caminho) return '';
    return caminho.startsWith('http') ? caminho : this.baseUrl + caminho;
  }

  async exibirMensagem(msg: string, cor: string = 'success') {
    const t = await this.toastController.create({ message: msg, color: cor, duration: 2000 });
    t.present();
  }

}