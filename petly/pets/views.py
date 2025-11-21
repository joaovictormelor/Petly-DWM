from django.shortcuts import render
from .models import Pet
from django.contrib.auth.decorators import login_required

def listar_pets(request):
    pets = Pet.objects.all()
    
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