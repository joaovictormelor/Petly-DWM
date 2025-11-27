import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, camera } from 'ionicons/icons';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-cadastrar-pet',
  templateUrl: './cadastrar-pet.page.html',
  styleUrls: ['./cadastrar-pet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastrarPetPage implements OnInit {

  pet = {
    nome: '',
    especie: 'cachorro',
    porte: 'pequeno',
    idade: 0,
    descricao: ''
  };

  fotoPreview: string = '';
  fotoBlob: Blob | null = null;

  baseUrl = 'http://127.0.0.1:8000'; 

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) { 
    addIcons({ camera });66
  }

  ngOnInit() { }

  async tirarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 80,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      this.fotoPreview = image.webPath!;

      const response = await fetch(image.webPath!);
      this.fotoBlob = await response.blob();

    } catch (error) {
      console.log('Usuário cancelou a foto ou deu erro');
    }
  }

async salvarPet() {
    const loader = await this.loading.create({ message: 'Salvando...' });
    await loader.present();

    const idUsuario = localStorage.getItem('user_id');

    if (!idUsuario) {
      await loader.dismiss();
      this.exibirMensagem('Erro: Usuário não identificado. Faça login novamente.', 'danger');
      this.router.navigate(['/login']);
      return;
    }

    const formData = new FormData();
    formData.append('usuario', idUsuario); 
    
    formData.append('nome', this.pet.nome);
    formData.append('especie', this.pet.especie);
    formData.append('porte', this.pet.porte);
    formData.append('idade', this.pet.idade.toString());
    formData.append('descricao', this.pet.descricao);

    if (this.fotoBlob) {
      formData.append('foto', this.fotoBlob, 'pet.jpg'); 
    }

    this.http.post(this.baseUrl + '/pets/api/criar/', formData).subscribe({
      next: async (res) => {
        await loader.dismiss();
        this.exibirMensagem('Pet cadastrado com sucesso!');
        this.router.navigate(['/tabs/meus-pets']);
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        const msgErro = erro.error?.erro || 'Erro ao salvar. Tente novamente.';
        this.exibirMensagem(msgErro, 'danger');
      }
    });
  }

  async exibirMensagem(msg: string, cor: string = 'success') {
    const t = await this.toast.create({ message: msg, color: cor, duration: 2000 });
    t.present();
  }
}