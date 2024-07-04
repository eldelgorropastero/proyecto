from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .models import Autor, Libro, Usuario, Compra
from .views import AutorViewSet, LibroViewSet, UsuarioViewSet, CompraViewSet

router = DefaultRouter()

router.register('autor', AutorViewSet)
router.register('libro', LibroViewSet)
router.register('usuario', UsuarioViewSet)
router.register('compra', CompraViewSet)

urlpatterns = [
    path('', include(router.urls)),
]