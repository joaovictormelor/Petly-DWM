from django.urls import path
from .views import Login, Cadastro, Logout, LoginAPI, CadastroAPI

urlpatterns = [
    path('', Login.as_view(), name='login'),
    path('cadastro/', Cadastro.as_view(), name='cadastro'),
    path('logout/', Logout.as_view(), name='logout'),
    path('api/login/', LoginAPI.as_view(), name='api_login'),
    path('api/cadastro/', CadastroAPI.as_view(), name='api_cadastro'),
]