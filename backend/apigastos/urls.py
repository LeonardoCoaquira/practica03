from django.urls import path
from .views import (
    TipoGastoListCreateAPIView,
    TipoGastoRetrieveUpdateDestroyAPIView,
    VehiculoListCreateAPIView,
    VehiculoRetrieveUpdateDestroyAPIView,
    VehiculoGastoListCreateAPIView,
    VehiculoGastoRetrieveUpdateDestroyAPIView,
    IndexView
)

app_name = 'tu_aplicacion'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('tipogasto/', TipoGastoListCreateAPIView.as_view(), name='tipogasto-list-create'),
    path('tipogasto/<int:pk>/', TipoGastoRetrieveUpdateDestroyAPIView.as_view(), name='tipogasto-retrieve-update-destroy'),
    path('vehiculo/', VehiculoListCreateAPIView.as_view(), name='vehiculo-list-create'),
    path('vehiculo/<int:pk>/', VehiculoRetrieveUpdateDestroyAPIView.as_view(), name='vehiculo-retrieve-update-destroy'),
    path('vehiculogasto/', VehiculoGastoListCreateAPIView.as_view(), name='vehiculogasto-list-create'),
    path('vehiculogasto/<int:pk>/', VehiculoGastoRetrieveUpdateDestroyAPIView.as_view(), name='vehiculogasto-retrieve-update-destroy'),
]
