import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importamos os componentes VISUAIS um por um (Mais seguro para Standalone)
import { IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText, ToastController, LoadingController } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // Adicionamos todos os componentes visuais aqui na lista 👇
  imports: [IonContent, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  usuario: string = "";
  senha: string = "";

  // Ajuste a URL se necessário
  apiUrl = 'http://127.0.0.1:8000/api/login/';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {}

  async fazerLogin() {
    const loading = await this.loadingController.create({
      message: 'Entrando...',
      duration: 3000
    });
    await loading.present();

    const dados = {
      username: this.usuario,
      password: this.senha
    };

    this.http.post(this.apiUrl, dados).subscribe({
      next: async (resposta: any) => {
        await loading.dismiss();
        console.log("Login autorizado!", resposta);
        this.exibirMensagem("Bem-vindo(a) " + resposta.nome + "!", "success");
        localStorage.setItem('user_id', resposta.user_id);
        this.router.navigate(['/tabs/home']);
      },
      error: async (erro) => {
        await loading.dismiss();
        console.error("Erro:", erro);
        this.exibirMensagem("Usuário ou senha incorretos!", "danger");
      }
    });
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

  irParaCadastro() {
  this.router.navigate(['/cadastro']);
}

}


