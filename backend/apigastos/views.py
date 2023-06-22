from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import TipoGasto, Vehiculo, VehiculoGasto
from .serializers import TipoGastoSerializer, VehiculoSerializer, VehiculoGastoSerializer

class IndexView(APIView):
    
    def get(self,request):
        context = {'mensaje':'servidor activo Practica 03'}
        return Response(context)

class TipoGastoListCreateAPIView(generics.ListCreateAPIView):
    queryset = TipoGasto.objects.all()
    serializer_class = TipoGastoSerializer

class TipoGastoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TipoGasto.objects.all()
    serializer_class = TipoGastoSerializer

class VehiculoListCreateAPIView(generics.ListCreateAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

class VehiculoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vehiculo.objects.all()
    serializer_class = VehiculoSerializer

class VehiculoGastoListCreateAPIView(generics.ListCreateAPIView):
    queryset = VehiculoGasto.objects.all()
    serializer_class = VehiculoGastoSerializer

class VehiculoGastoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = VehiculoGasto.objects.all()
    serializer_class = VehiculoGastoSerializer
