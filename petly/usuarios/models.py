from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    telefone = models.CharField(max_length=20)
    cep = models.CharField(max_length=9, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    uf = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return f"Perfil de {self.usuario.username}"