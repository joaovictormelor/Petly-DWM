from django.urls import path
from .views import listar_pets

urlpatterns = [
    path('', listar_pets, name='listar_pets'),
]