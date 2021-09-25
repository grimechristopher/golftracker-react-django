from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.deletion import CASCADE # To set minimum and maximum integer valuses # I no longer remember what this is...
from colorfield.fields import ColorField


# Hardcoded list of possible Tee colors to choose from. Currently used to set the options for the tee select fields
# Planned to change the way the select list chooses tee colors
COLOR_CHOICES = (
    ("WHITE", "White"),
    ("RED", "Red"),
    ("BLUE", "Blue"),
    ("GREEN", "Green"),
    ("BLACK", "Black"),
    ("GOLD", "Gold"),
)

# Create your models here.
class GolferUser(AbstractUser):

    GENDER_CHOICES = ( ('MALE', 'Male'),
                     ('FEMALE', 'Female'), )

    pass
    # add additional fields in here
    gender = models.CharField(choices=GENDER_CHOICES, max_length=255)

    def __str__(self):
        return self.username

# # # # # # # # # # # # # # #
#   Course related models   #
# # # # # # # # # # # # # # #

# Course model 
class Course(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    tee_colors = models.ManyToManyField('TeeColor', related_name='courses') # Each hole must be attached to a course.
    # Planned to add picture field 
    # Planned to add user comments field

    class Meta:
        ordering = ['name']
    
    def __str__(self):
        return self.name

# Hole model. Each course can have any number of holes, typicaly in multiples of 9's.  9, 18,  and 27 are common
# Par is different for men and women players.
# Each course "Should" only have one of each number. Some courses have multiple 1-9 holes. This is a possible change to make to the application in  the future
class Hole(models.Model):
    number = models.IntegerField(unique=False) 
    name = models.CharField(max_length=255, blank=True, null=True, verbose_name='Name of this hole (optional)') # Optional: Most courses dont name their holes
    course = models.ForeignKey('Course', on_delete=CASCADE, null=False, blank=False, related_name='holes') # Each hole must be attached to a course.
    mens_par = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(1)])
    womens_par = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(1)])

    #class Meta:
    #    unique_together = (('number','course'),)
    
    def __str__(self):
        if (self.name):
            return self.name + ' at ' + self.course.name
        else:
            return 'Hole ' + str(self.number) + ' at ' + self.course.name


# Each Course's hole can have multiple tees. Tees are differentiated by color. Each hole can only have one tee of each color
# Tees have a different distance(yards) to the hole from the tee box 
class Tee(models.Model):
    tee_color = models.ForeignKey('TeeColor', on_delete=CASCADE, null=False, blank=False, related_name='tees') 
    #color = models.CharField(choices=COLOR_CHOICES, blank=True, null=True, max_length=255)
    yards = models.IntegerField(validators=[MaxValueValidator(1000), MinValueValidator(1)])
    hole = models.ForeignKey('Hole', on_delete=CASCADE, null=True, blank=True, related_name='tees')




    #class Meta:
    #    unique_together = (('color','hole'),) # only have one of each color on the hole

    def __str__(self):
        return str(self.color) + " Tee on " + str(self.hole)

# Tee color model is planned to replace the hardcoded COLOR_CHOICES
class TeeColor(models.Model):
    name = models.CharField(blank=False, null=True, max_length=255)
    color = ColorField(default='#000000', blank=False, null=False)

    def __str__(self):
        return self.name + " (" + self.color + ")"
