from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models.deletion import CASCADE # To set minimum and maximum integer valuses # I no longer remember what this is...
from colorfield.fields import ColorField
from django.conf import settings
from datetime import datetime, time, date

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

    # add additional fields in here
    gender = models.CharField(choices=GENDER_CHOICES, max_length=255)

    def __str__(self):
        return self.username

# # # # # # # # # # # # # # #
#   Course related models   #
# # # # # # # # # # # # # # #
# Tee color model is planned to replace the hardcoded COLOR_CHOICES
class TeeColor(models.Model):
    name = models.CharField(blank=False, null=True, max_length=255)
    color = ColorField(default='#000000', blank=False, null=False)

    def __str__(self):
        return self.name + " (" + self.color + ")"


# Course model 
class Course(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    tee_colors = models.ManyToManyField('TeeColor', blank=True, related_name='courses') # Each hole must be attached to a course.
    rating_average = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)
    # Planned to add picture field 
    # Planned to add user comments field

    def update_rating(self):
        course_rating = self.courserating.all()
        self.rating_average = course_rating.aggregate(models.Avg('rating')).get('rating__average')
        self.review_count = course_rating.count()
        self.save(update_fields=['rating_average', 'rating_count'])

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
    #    unique_together = (('tee_color','hole'),) # only have one of each color on the hole

    def __str__(self):
        return str(self.tee_color.name) + " Tee on " + str(self.hole)

class Round(models.Model):
    course = models.ForeignKey('Course', on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=255, null=True, blank=True, verbose_name='Title this round (optional)')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_on = models.DateTimeField(default=datetime.now)
    completed_on = models.DateTimeField(null=True, blank=True)
    tee_color = models.ForeignKey('TeeColor', on_delete=models.CASCADE, null=False, default="1")

    class Meta:
        ordering = ['-created_on']

class Score(models.Model):
    round = models.ForeignKey('Round', on_delete=models.CASCADE, null=False, related_name='scores')
    hole = models.ForeignKey('Hole', on_delete=models.SET_NULL, null=True)
    strokes = models.IntegerField(validators=[MaxValueValidator(99), MinValueValidator(1)]) 

class CourseRating(models.Model):
    rating = models.IntegerField(validators=[MaxValueValidator(1), MinValueValidator(5)])
    course = models.ForeignKey('Course', on_delete=models.CASCADE, null=False, related_name='course_rating')
    rated_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='course_rating')

    class Meta:
        unique_together = ['course', 'rated_by']
    
    def __str__(self):
            return str(self.course.name) + " " + str(self.rated_by.email) + " " + str(self.rating)

    def save(self, *args, **kwargs):
        super(CourseRating, self).save(*args, **kwargs)
        self.course.update_rating()