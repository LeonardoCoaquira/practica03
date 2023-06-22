from rest_framework import serializers
from .models import TipoGasto, Vehiculo, VehiculoGasto

class TipoGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoGasto
        fields = '__all__'

class VehiculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehiculo
        fields = '__all__'

class VehiculoGastoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehiculoGasto
        fields = '__all__'
