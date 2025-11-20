from django.contrib.auth import authenticate, login, logout
from django.views.generic import View, CreateView
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from .forms import CadastroForm

class Login(View):
    #class based view para autenticação de usuarios

    def get(self, request):
        contexto = {}
        if request.user.is_authenticated:
            return redirect('/pets')
        else:
            return render(request, 'autenticacao.html', contexto)



    def post(self, request):
        #obetem credecniais de autenticação
        usuario = request.POST.get('usuario', None)
        senha = request.POST.get('senha', None)


       # verifica as credencias fornecidas
        user = authenticate(request, username=usuario,password=senha)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect("/pets")
            
            return render(request, 'autenticacao.html', {'mensagem': 'usuario ou senha incorretos'})
            
        return render(request, 'autenticacao.html', {'mensagem': 'usuario ou senha incorretos'})
    

class Logout(View):
    """
    class based view para realizar logout de usuarios
    """         
    def get(self, request):
        logout(request)
        return redirect('/')


class Cadastro(CreateView):
    template_name = 'cadastro.html'
    form_class = CadastroForm
    success_url = reverse_lazy('login')

