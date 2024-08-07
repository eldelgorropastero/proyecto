from rest_framework import serializers
from .models import Autor, Libro, Usuario, Compra

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'

class LibroSerializer(serializers.ModelSerializer):
    autores = AutorSerializer(many=True, read_only=True)
    
    class Meta:
        model = Libro
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class CompraSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()
    libro = LibroSerializer()
    
    class Meta:
        model = Compra
        fields = '__all__'