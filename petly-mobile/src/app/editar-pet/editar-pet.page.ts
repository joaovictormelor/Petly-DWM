import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-pet',
  templateUrl: './editar-pet.page.html',
  styleUrls: ['./editar-pet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditarPetPage implements OnInit {

  pet: any = {
    nome: '',
    especie: '',
    porte: '',
    idade: null,
    descricao: ''
  };

  petId: any = '';
  baseUrl = 'http://127.0.0.1:8000'; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toast: ToastController,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.petId = this.route.snapshot.paramMap.get('id');
    
    this.carregarDados();
  }

  async carregarDados() {
    const loader = await this.loading.create({ message: 'Carregando...' });
    await loader.present();

    this.http.get(this.baseUrl + '/pets/api/gerenciar/' + this.petId + '/').subscribe({
      next: async (dados: any) => {
        await loader.dismiss();
        this.pet = dados;
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        this.exibirMensagem('Erro ao carregar dados.', 'danger');
      }
    });
  }

async salvarEdicao() {
    const loader = await this.loading.create({ message: 'Salvando...' });
    await loader.present();

    const dadosParaEnviar = { ...this.pet };

    delete dadosParaEnviar.foto; 
    delete dadosParaEnviar.dono_email;
    delete dadosParaEnviar.dono_telefone;
    delete dadosParaEnviar.cidade;
    delete dadosParaEnviar.uf;

    this.http.patch(this.baseUrl + '/pets/api/gerenciar/' + this.petId + '/', dadosParaEnviar).subscribe({
      next: async (res) => {
        await loader.dismiss();
        this.exibirMensagem('Pet atualizado com sucesso!');
        this.router.navigate(['/tabs/meus-pets']);
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        console.log(JSON.stringify(erro.error)); 
        this.exibirMensagem('Erro ao atualizar.', 'danger');
      }
    });
  }
  async exibirMensagem(msg: string, cor: string = 'success') {
    const t = await this.toast.create({ message: msg, color: cor, duration: 2000 });
    t.present();
  }
}