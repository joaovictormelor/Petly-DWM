from django.shortcuts import render
from .models import Pet
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import PetForm
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView
from django.urls import reverse_lazy
from rest_framework import generics
from .serializers import PetSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

def listar_pets(request):
    pets = Pet.objects.all()

    if request.user.is_authenticated:
        pets = pets.exclude(usuario=request.user)

    busca_especie = request.GET.get('especie')
    busca_porte = request.GET.get('porte')
    
    if busca_especie and busca_especie != '':
        pets = pets.filter(especie=busca_especie)

    if busca_porte and busca_porte != '':
        pets = pets.filter(porte=busca_porte)   
    
    contexto = {
        'pets': pets
    }
    
    return render(request, 'listar_pets.html', contexto)


@login_required
def meus_pets(request):
    pets = Pet.objects.filter(usuario=request.user)
    
    contexto = {
        'pets': pets,
    }
    
    return render(request, 'meus_pets.html', contexto)

class NovoPet(LoginRequiredMixin, CreateView):
    model = Pet
    form_class = PetForm
    template_name = 'form_pet.html'
    success_url = reverse_lazy('meus_pets')
    
    # o dono desse pet é quem está logado
    def form_valid(self, form):
        form.instance.usuario = self.request.user
        return super().form_valid(form)

class EditarPet(LoginRequiredMixin, UpdateView):
    model = Pet
    form_class = PetForm
    template_name = 'form_pet.html'
    success_url = reverse_lazy('meus_pets')
    
    def get_queryset(self):
        return Pet.objects.filter(usuario=self.request.user)
    
class ExcluirPet(LoginRequiredMixin, DeleteView):
    model = Pet
    template_name = 'excluir_pet.html'
    success_url = reverse_lazy('meus_pets')
    
    def get_queryset(self):
        return Pet.objects.filter(usuario=self.request.user)
    
class DetalhesPet(DetailView):
    model = Pet
    template_name = 'detalhes_pet.html'
    context_object_name = 'pet'
    
class ListaPetsAPI(generics.ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class DetalhesPetAPI(generics.RetrieveAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class CriarPetAPI(generics.CreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    
    def perform_create(self, serializer):
        id_do_dono = self.request.data.get('usuario')
        
        print(f"Tentando cadastrar pet para o usuário ID: {id_do_dono}")
        if id_do_dono:
            dono = get_object_or_404(User, pk=id_do_dono)
            serializer.save(usuario=dono)
        else:
            serializer.save(usuario=self.request.user)

class GerenciarPetAPI(RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer