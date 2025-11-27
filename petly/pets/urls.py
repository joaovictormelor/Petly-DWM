from django.urls import path
from .views import listar_pets, meus_pets, NovoPet, EditarPet, ExcluirPet, DetalhesPet, ListaPetsAPI, DetalhesPetAPI, CriarPetAPI

urlpatterns = [
    path('', listar_pets, name='listar_pets'),
    path('meus/', meus_pets, name='meus_pets'),
    path('novo/', NovoPet.as_view(), name='novo_pet'),
    path('editar/<int:pk>/', EditarPet.as_view(), name='editar_pet'),
    path('excluir/<int:pk>/', ExcluirPet.as_view(), name='excluir_pet'),
    path('<int:pk>/', DetalhesPet.as_view(), name='detalhes_pet'),
    path('api/listar/', ListaPetsAPI.as_view(), name='api_listar_pets'),
    path('api/detalhes/<int:pk>/', DetalhesPetAPI.as_view(), name='api_detalhes_pet'),
    path('api/criar/', CriarPetAPI.as_view(), name='api_criar_pet'),
]

