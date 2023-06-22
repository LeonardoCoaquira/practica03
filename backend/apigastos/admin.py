from django.contrib import admin

# Register your models here.
from .models import TipoGasto, Vehiculo, VehiculoGasto

admin.site.register(TipoGasto)
admin.site.register(Vehiculo)
admin.site.register(VehiculoGasto)
