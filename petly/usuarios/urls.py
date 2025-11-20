from django.urls import path
from .views import Login, Cadastro, Logout

urlpatterns = [
    path('', Login.as_view(), name='login'),
    path('cadastro/', Cadastro.as_view(), name='cadastro'),
    path('logout/', Logout.as_view(), name='logout'),
]