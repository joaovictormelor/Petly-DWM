from django.contrib.auth import authenticate, login, logout
from django.views.generic import View, CreateView
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from .forms import CadastroForm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Perfil


class Login(View):
    """
    classe para fazer o login do usuario
    """
    def get(self, request):
        contexto = {}
        if request.user.is_authenticated:
            return redirect('/pets')
        else:
            return render(request, 'autenticacao.html', contexto)

    def post(self, request):
        usuario = request.POST.get('usuario', None)
        senha = request.POST.get('senha', None)


        user = authenticate(request, username=usuario,password=senha)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect("/pets")
            
            return render(request, 'autenticacao.html', {'mensagem': 'usuario ou senha incorretos'})
            
        return render(request, 'autenticacao.html', {'mensagem': 'usuario ou senha incorretos'})
    

class Logout(View):
    """
    classe view para realizar logout de usuarios
    """         
    def get(self, request):
        logout(request)
        return redirect('/')


class Cadastro(CreateView):
    template_name = 'cadastro.html'
    form_class = CadastroForm
    success_url = reverse_lazy('login')


class LoginAPI(APIView):
    def post(self, request):
        usuario = request.data.get('username')
        senha = request.data.get('password')

        user = authenticate(username=usuario, password=senha)

        if user:
            return Response({
                'mensagem': 'Login realizado com sucesso',
                'user_id': user.id,
                'nome': user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({'erro': 'Usuário ou senha incorretos'}, status=status.HTTP_401_UNAUTHORIZED)


class CadastroAPI(APIView):
    def post(self, request):
        usuario_txt = request.data.get('username')
        email_txt = request.data.get('email')
        senha_txt = request.data.get('password')
        telefone_txt = request.data.get('telefone')

        if User.objects.filter(username=usuario_txt).exists():
            return Response({'erro': 'Este nome de usuário já existe!'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            novo_user = User.objects.create_user(username=usuario_txt, password=senha_txt, email=email_txt)
            
            Perfil.objects.create(usuario=novo_user, telefone=telefone_txt)

            return Response({'mensagem': 'Usuário criado com sucesso!'}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'erro': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)