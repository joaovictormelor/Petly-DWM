from django.shortcuts import render
from .models import Pet
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import PetForm
from django.views.generic import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy

def listar_pets(request):
    pets = Pet.objects.all()

    if request.user.is_authenticated:
        pets = pets.exclude(usuario=request.user)    
    
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
    
    #reaproveita a tela listar
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