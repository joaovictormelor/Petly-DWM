from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from usuarios.models import Perfil

class CadastroForm(UserCreationForm):
    email = forms.EmailField(required=True, label="Endereço de Email")
    telefone = forms.CharField(max_length=20, required=True, label="Telefone / WhatsApp")

    class Meta:
        model = User
        fields = ("username", "email", "telefone")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        if commit:
            user.save()
            Perfil.objects.create(usuario=user, telefone=self.cleaned_data["telefone"])
        return user