from rest_framework import serializers
from .models import Doctor, Appointment
from datetime import date

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'speciality', 'department']

class AppointmentSerializer(serializers.ModelSerializer):
    # accept doctor_id from client, return nested doctor object on read
    doctor_id = serializers.IntegerField(write_only=True, required=True)
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'patient_name', 'age', 'appointment_date', 'doctor', 'doctor_id']

    def validate_appointment_date(self, value):
        if value < date.today():
            raise serializers.ValidationError("Appointment date cannot be in the past.")
        return value

    def create(self, validated_data):
        doctor_id = validated_data.pop('doctor_id')
        doctor = Doctor.objects.get(pk=doctor_id)
        user = self.context['request'].user
        appointment = Appointment.objects.create(doctor=doctor, user=user, **validated_data)
        return appointment
