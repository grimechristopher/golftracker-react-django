from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import GolferUserCreationForm, GolferUserChangeForm
from .models import GolferUser, Course, Hole, Tee, TeeColor

class GolferUserAdmin(UserAdmin):
    add_form = GolferUserCreationForm
    form = GolferUserChangeForm
    model = GolferUser
    list_display = ['email', 'username', 'gender', ]

# Register your models here.
admin.site.register(GolferUser, GolferUserAdmin)
admin.site.register(Hole)
admin.site.register(Tee)
admin.site.register(TeeColor)
admin.site.register(Course)