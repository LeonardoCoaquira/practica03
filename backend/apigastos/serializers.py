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
    def to_representation(self,instance):
        representation = super().to_representation(instance)
        representation['vehiculo'] = instance.vehiculo.marca
        representation['tipo_gasto'] = instance.tipo_gasto.nombre
        return representation
