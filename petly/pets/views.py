from django.shortcuts import render
from django.shortcuts import render
from .models import Pet

def listar_pets(request):
    pets = Pet.objects.all()
    
    contexto = {
        'pets': pets
    }
    
    return render(request, 'listar_pets.html', contexto)