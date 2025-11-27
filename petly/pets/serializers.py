from rest_framework import serializers
from .models import Pet

class PetSerializer(serializers.ModelSerializer):
    dono_email = serializers.CharField(source='usuario.email', read_only=True)
    dono_telefone = serializers.CharField(source='usuario.perfil.telefone', read_only=True)
    cidade = serializers.CharField(source='usuario.perfil.cidade', read_only=True)
    uf = serializers.CharField(source='usuario.perfil.uf', read_only=True)
    
    class Meta:
            model = Pet
            fields = [
                'id', 
                'usuario',
                'nome', 
                'especie', 
                'porte', 
                'idade', 
                'foto', 
                'descricao',
                'dono_email', 
                'dono_telefone', 
                'cidade', 
                'uf'
            ]