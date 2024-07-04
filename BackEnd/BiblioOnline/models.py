from django.db import models

# Create your models here.
class Autor(models.Model):
    nombre = models.CharField(max_length=100)
    nacionalidad = models.CharField(max_length=50)
    fecha_de_nacimiento = models.DateField()

    def __str__(self):
        return f'{self.nombre} de Nacionalidad: {self.nacionalidad}'

class Libro(models.Model):
    titulo = models.CharField(max_length=200)
    fecha_de_publicacion = models.DateField()
    autores = models.ManyToManyField(Autor)
    genero = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.titulo} del Autor: {self.autores}'

class Usuario(models.Model):
    nombre_apellido = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.nombre_apellido}'

class Compra(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    libro = models.ForeignKey(Libro, on_delete=models.CASCADE)
    fecha_compra = models.DateField()

    def __str__(self):
        return f'{self.usuario} compro el Libro: {self.libro} el {self.fecha_compra}'