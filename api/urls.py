
# api/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('doctors/', views.doctor_list, name='doctor-list'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
    path('appointments/', views.create_appointment, name='create-appointment'),
    path('appointments/list/', views.list_appointments, name='list-appointments'),
]

"""from django.urls import path
from . import views

urlpatterns = [
    # GET: List doctors
    path('doctors/', views.doctor_list, name='doctor-list'),

    # POST: Login to get token
    path('login/', views.CustomAuthToken.as_view(), name='login'),

    # POST: Create appointment
    path('appointments/', views.create_appointment, name='create-appointment'),

    # GET: List appointments 
    path('appointments/list/', views.list_appointments, name='list-appointments'),
]
from django.urls import path
from . import views

urlpatterns = [
    path('api/doctors/', views.doctor_list),
]

from django.urls import path
from . import views

urlpatterns = [
    path('doctors/', views.doctor_list, name='doctor-list'),          # GET
    path('login/', views.CustomAuthToken.as_view(), name='login'),    # POST => token
    path('appointments/', views.create_appointment, name='create-appointment'),  # POST
    path('appointments/list/', views.list_appointments, name='list-appointments'), # GET
]"""
