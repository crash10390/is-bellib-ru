from django import forms
from .models import User


class AuthForm(forms.Form):
    email = forms.EmailField(required=True)
    password = forms.CharField(widget=forms.PasswordInput, required=True)


class EditLibrarianForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, required=True)
    confirm_password = forms.CharField(widget=forms.PasswordInput, required=True)

    class Meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'self_number',
            'ticket_number',
            'library',
            'phone',
            'email']
class EditProfileLibrarianForm(forms.ModelForm):


    class Meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'self_number',
            'ticket_number',
            'library',
            'phone',
            'email']


class AddReaderForm(EditLibrarianForm):
    class Meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'ticket_number',
            'phone',
            'email']


class EditReaderForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, required=False)

    class Meta:
        model = User
        fields = [
            'first_name',
            'middle_name',
            'last_name',
            'ticket_number',
            'phone',
            'email']
