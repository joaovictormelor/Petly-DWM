import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, ToastController, LoadingController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule]
})
export class CadastroPage implements OnInit {

  usuario: string = "";
  email: string = "";
  telefone: string = "";
  senha: string = "";

  // Ajuste o IP se necessário
  apiUrl = 'http://127.0.0.1:8000/api/cadastro/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() { }

  async fazerCadastro() {
    const loading = await this.loadingController.create({ message: 'Cadastrando...' });
    await loading.present();

    const dados = {
      username: this.usuario,
      email: this.email,
      password: this.senha,
      telefone: this.telefone
    };

    this.http.post(this.apiUrl, dados).subscribe({
      next: async (res) => {
        await loading.dismiss();
        this.exibirMensagem('Conta criada com sucesso!', 'success');
        this.router.navigate(['/login']); // Volta pro login
      },
      error: async (erro) => {
        await loading.dismiss();
        console.error(erro);
        // Tenta pegar a mensagem de erro do Django, se não, usa genérica
        const msg = erro.error.erro || 'Erro ao criar conta.';
        this.exibirMensagem(msg, 'danger');
      }
    });
  }

  voltar() {
    this.router.navigate(['/login']);
  }

  async exibirMensagem(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 2000,
      color: cor,
      position: 'bottom'
    });
    toast.present();
  }
}