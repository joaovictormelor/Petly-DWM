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

    // ⚠️ AQUI ESTÁ O TRUQUE:
    // Estamos enviando os dados para a API
    this.http.post(this.baseUrl + '/pets/api/criar/', this.pet).subscribe({
      next: async (res) => {
        await loader.dismiss();
        this.exibirMensagem('Pet cadastrado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        this.exibirMensagem('Erro ao salvar. Verifique se está logado.', 'danger');
      }
    });
  }

  async exibirMensagem(msg: string, cor: string = 'success') {
    const t = await this.toast.create({ message: msg, color: cor, duration: 2000 });
    t.present();
  }
}