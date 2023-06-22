from django.db import models

class TipoGasto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

class Vehiculo(models.Model):
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    año = models.IntegerField()

    def __str__(self):
        return f"{self.marca} {self.modelo} ({self.año})"

class VehiculoGasto(models.Model):
    vehiculo = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    tipo_gasto = models.ForeignKey(TipoGasto, on_delete=models.CASCADE)
    fecha = models.DateField()
    monto = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"Gasto de {self.vehiculo} - {self.tipo_gasto} - {self.monto}"
