import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'; // Para pegar o ID e navegar
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-pet',
  templateUrl: './editar-pet.page.html',
  styleUrls: ['./editar-pet.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditarPetPage implements OnInit {

  // Objeto que guarda os dados (começa vazio)
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
    // 1. Pega o ID da URL
    this.petId = this.route.snapshot.paramMap.get('id');
    
    // 2. Busca os dados atuais para preencher o formulário
    this.carregarDados();
  }

  async carregarDados() {
    const loader = await this.loading.create({ message: 'Carregando...' });
    await loader.present();

    this.http.get(this.baseUrl + '/pets/api/gerenciar/' + this.petId + '/').subscribe({
      next: async (dados: any) => {
        await loader.dismiss();
        this.pet = dados; // O formulário vai se preencher sozinho!
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

    // 1. Criamos uma cópia dos dados para não estragar a tela
    const dadosParaEnviar = { ...this.pet };

    // 2. REMOVEMOS A FOTO E OS DADOS EXTRAS DO PACOTE
    // Se mandarmos a URL da foto (texto) para o Django, ele trava.
    delete dadosParaEnviar.foto; 
    delete dadosParaEnviar.dono_email;
    delete dadosParaEnviar.dono_telefone;
    delete dadosParaEnviar.cidade;
    delete dadosParaEnviar.uf;

    // 3. Mudamos de PUT para PATCH (Atualização Parcial)
    this.http.patch(this.baseUrl + '/pets/api/gerenciar/' + this.petId + '/', dadosParaEnviar).subscribe({
      next: async (res) => {
        await loader.dismiss();
        this.exibirMensagem('Pet atualizado com sucesso!');
        this.router.navigate(['/tabs/meus-pets']);
      },
      error: async (erro) => {
        await loader.dismiss();
        console.error(erro);
        // Dica: Imprime o erro detalhado no console para a gente ver se persistir
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