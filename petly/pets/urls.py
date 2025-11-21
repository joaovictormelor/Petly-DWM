from django.urls import path
from .views import listar_pets, meus_pets

urlpatterns = [
    path('', listar_pets, name='listar_pets'),
    path('meus/', meus_pets, name='meus_pets'),
]