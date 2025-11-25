from rest_framework import serializers
from .models import Pet

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        # Aqui escolhemos quais campos vamos entregar na API
        fields = ['id', 'nome', 'especie', 'porte', 'idade', 'foto', 'descricao']