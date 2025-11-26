from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from usuarios.models import Perfil

class CadastroForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Endereço de Email")
    telefone = forms.CharField(max_length=20, required=True, label="Telefone / WhatsApp")

    cep = forms.CharField(
        max_length=9, 
        label="CEP",
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'cep', 'placeholder': '00000-000'})
    )
    cidade = forms.CharField(
        max_length=100, 
        label="Cidade",
        required=False, # O script preenche, então pode ser opcional na validação inicial
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'cidade', 'readonly': 'readonly'})
    )
    bairro = forms.CharField(
        max_length=100, 
        label="Bairro",
        required=False,
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'bairro', 'readonly': 'readonly'})
    )
    uf = forms.CharField(
        max_length=2, 
        label="UF",
        required=False,
        widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'uf', 'readonly': 'readonly'})
    )

    class Meta:
        model = User
        # Adicionamos os campos novos na ordem que devem aparecer
        fields = ("username", "email", "telefone", "cep", "cidade", "bairro", "uf")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        
        if commit:
            user.save()
            # AQUI SALVAMOS TUDO NO PERFIL
            Perfil.objects.create(
                usuario=user, 
                telefone=self.cleaned_data["telefone"],
                cep=self.cleaned_data["cep"],
                cidade=self.cleaned_data["cidade"],
                bairro=self.cleaned_data["bairro"],
                uf=self.cleaned_data["uf"]
            )
        return user