import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  selector: 'app-cadastrar-pet',
  templateUrl: './cadastrar-pet.page.html',
  styleUrls: ['./cadastrar-pet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastrarPetPage implements OnInit {

  // Objeto para guardar os dados do formulário
  pet = {
    nome: '',
    especie: 'cachorro',
    porte: 'pequeno',
    idade: 0,
    descricao: ''
  };

  baseUrl = 'http://127.0.0.1:8000'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) { }

  ngOnInit() { }

async salvarPet() {
    const loader = await this.loading.create({ message: 'Salvando...' });
    await loader.present();

    // 1. PEGAMOS O ID DO USUÁRIO SALVO NO LOGIN
    const idUsuario = localStorage.getItem('user_id');

    // 2. MONTAMOS O PACOTE COMPLETO
    // O ...this.pet copia os dados do formulário (nome, idade, etc)
    // E adicionamos o campo 'usuario' manualmente
    const dadosParaEnviar = {
      ...this.pet,
      usuario: idUsuario
    };

    console.log('Enviando:', dadosParaEnviar); // Para você conferir no console

    this.http.post(this.baseUrl + '/pets/api/criar/', dadosParaEnviar).subscribe({
      next: async (res) => {
        await loader.dismiss();
        this.exibirMensagem('Pet cadastrado com sucesso!');
        this.router.navigate(['/tabs/meus-pets']); // Volta para a aba certa
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        this.exibirMensagem('Erro ao salvar.', 'danger');
      }
    });
  }

  async exibirMensagem(msg: string, cor: string = 'success') {
    const t = await this.toast.create({ 
      message: msg, 
      color: cor, 
      duration: 2000,
      position: 'bottom'
    });
    t.present();
  }

}