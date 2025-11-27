from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Pet
from .forms import PetForm

# Create your tests here.


class TestesModelPet(TestCase):
    '''
    Testa se o model Pet está salvando corretamente os dados no banco de dados
    '''
    def setUp(self):
        self.user = User.objects.create(username='usuario_teste', password='senha123')

        self.pet = Pet(
            usuario=self.user,
            nome = 'Pipoca',
            especie = 'cachorro',
            porte = 'medio',
            idade = 5,
            descricao = 'Um cachorro dócil'
        )

    def test_str_pet(self):
        self.assertEqual(str(self.pet), 'Pipoca')


class TestViewListarMeusPets(TestCase):
    '''
    Testando a visualização da listagem de pets
    '''
    def setUp(self):
            self.user = User.objects.create_user(username='usuario_teste', password='123')
            self.client.force_login(self.user)

            Pet.objects.create(usuario=self.user,
                               nome='Mimi', 
                               especie='gato', 
                               idade=2, 
                               porte='pequeno')

            self.url = reverse('meus_pets')
    
    def test_get(self):
            response = self.client.get(self.url)
            
            self.assertEqual(response.status_code, 200)
            
            self.assertEqual(len(response.context['pets']), 1)
            self.assertEqual(response.context['pets'][0].nome, 'Mimi')


class TestViewCriarPet(TestCase):
    '''
    Testa a criação de um novo Pet
    '''
    def setUp(self):
        self.user = User.objects.create_user(username='usuario_teste', password='123')
        self.client.force_login(self.user)
        self.url = reverse('novo_pet')
    

    def test_get_form(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context['form'], PetForm)
    

    def test_post_criar(self):
        dados = {
            'nome': 'Totó',
            'especie': 'cachorro',
            'porte': 'grande',
            'idade': 3,
            'descricao': 'Teste de criação'
        }
    
        response = self.client.post(self.url, dados)

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, reverse('meus_pets'))
        self.assertEqual(Pet.objects.count(), 1)
        self.assertEqual(Pet.objects.first().nome, 'Totó')
        self.assertEqual(Pet.objects.first().usuario, self.user)


class TestViewEditarPet(TestCase):
    '''
    Testa a edição de um Pet existente
    '''
    def setUp(self):
        self.user = User.objects.create_user(username='usuario_teste', password='123')
        self.client.force_login(self.user)

        self.pet = Pet.objects.create(usuario=self.user, nome='Gatinho', 
                                      especie='gato', 
                                      idade=1, 
                                      porte='pequeno', 
                                      descricao='gatinho fofo')
        self.url = reverse('editar_pet', kwargs={'pk': self.pet.pk})
    
    def test_get_editar(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
      
        self.assertEqual(response.context['form'].instance.nome, 'Gatinho')
    
    def test_post_editar(self):
        dados = {
            'nome': 'Editado',
            'especie': 'gato',
            'porte': 'pequeno',
            'idade': 1,
            'descricao': 'Editado agora'
        }

        response = self.client.post(self.url, dados)
        
        self.assertRedirects(response, reverse('meus_pets'))
        
        self.pet.refresh_from_db()
        self.assertEqual(self.pet.nome, 'Editado')
        

class TestViewDeletarPet(TestCase):
    '''
    Testa a exclusão de um Pet
    '''
    def setUp(self):
        self.user = User.objects.create_user(username='usuario_teste', password='123')
        self.client.force_login(self.user)
        self.pet = Pet.objects.create(usuario=self.user, nome='Para Deletar', 
                                      especie='gato', 
                                      idade=5, 
                                      porte='medio')
        self.url = reverse('excluir_pet', kwargs={'pk': self.pet.pk})

    def test_post_deletar(self):
        response = self.client.post(self.url)
        
        self.assertRedirects(response, reverse('meus_pets'))
        
        self.assertEqual(Pet.objects.count(), 0)
