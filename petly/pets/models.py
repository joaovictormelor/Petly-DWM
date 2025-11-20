from django.db import models

# Create your models here.

class Pet(models.Model):
    ESPECIE_CHOICES = [
        ('cachorro', 'Cachorro'),
        ('gato', 'Gato'),
        ('outro', 'Outro'),
    ]
    
    PORTE_CHOICES = [
        ('pequeno', 'Pequeno'),
        ('medio', 'Médio'),
        ('grande', 'Grande'),
    ]

    nome = models.CharField(max_length=100)
    especie = models.CharField(max_length=20, choices=ESPECIE_CHOICES)
    porte = models.CharField(max_length=20, choices=PORTE_CHOICES)
    idade = models.IntegerField()
    descricao = models.TextField(blank=True, null=True) # blank=True permite o campo ficar vazio no formulário
    
    foto = models.ImageField(upload_to='pets_fotos/', blank=True, null=True)

    adotado = models.BooleanField(default=False)


    def __str__(self):
        return self.nome