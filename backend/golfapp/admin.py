from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import GolferUserCreationForm, GolferUserChangeForm
from .models import CourseRating, GolferUser, Course, Hole, Tee, TeeColor, Round, Score

class GolferUserAdmin(UserAdmin):
    add_form = GolferUserCreationForm
    form = GolferUserChangeForm
    model = GolferUser
    list_display = ['email', 'username', 'gender', ]
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            'fields': ('gender',),
        }),
    )

# Register your models here.
admin.site.register(GolferUser, GolferUserAdmin)
admin.site.register(Hole)
admin.site.register(Tee)
admin.site.register(TeeColor)
admin.site.register(Course)
admin.site.register(Round)
admin.site.register(Score)
admin.site.register(CourseRating)