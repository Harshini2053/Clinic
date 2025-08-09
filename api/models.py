from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.speciality}"

class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    appointment_date = models.DateField()
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # The logged-in user

    def __str__(self):
        return f"Appointment for {self.patient_name} with Dr. {self.doctor.name}"

    def clean(self):
        # Prevent past dates
        if self.appointment_date < timezone.now().date():
            from django.core.exceptions import ValidationError
            raise ValidationError("Appointment date cannot be in the past.")

