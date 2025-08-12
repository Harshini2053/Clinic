# api/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Doctor, Appointment
from .serializers import DoctorSerializer, AppointmentSerializer


# -------------------------
# 1) Login and get token
# -------------------------
class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user_id": user.pk,
            "username": user.username
        })


# -------------------------
# 2) Get all doctors (public)
# -------------------------
@api_view(['GET'])
@permission_classes([AllowAny])
def doctor_list(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


# -------------------------
# 3) Create an appointment (requires login)
# -------------------------
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_appointment(request):
    serializer = AppointmentSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------
# 4) List appointments for logged-in user
# -------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_appointments(request):
    appointments = Appointment.objects.filter(user=request.user)
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)
