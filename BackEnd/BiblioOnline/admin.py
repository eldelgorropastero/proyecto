from django.contrib import admin
from .models import Autor, Libro, Usuario, Compra

# Register your models here.
admin.site.register(Autor)
admin.site.register(Libro)
admin.site.register(Usuario)
admin.site.register(Compra)