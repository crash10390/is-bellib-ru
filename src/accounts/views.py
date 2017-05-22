from django.views.defaults import permission_denied
from django.views.generic import FormView, TemplateView, UpdateView, View
from django.shortcuts import redirect, HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from elcat.models import library
import json
from .forms import AuthForm, EditLibrarianForm, AddReaderForm, EditReaderForm, EditProfileLibrarianForm
from .models import User


class LoginView(FormView):
    template_name = 'accounts_login.html'
    form_class = AuthForm
    formError = ''

    def form_valid(self, form):
        data = form.cleaned_data
        user = authenticate(email=data['email'], password=data['password'])
        if user is not None:
            login(self.request, user)
            return redirect('/')
        self.formError = 'Email или пароль не распознаны.'
        return self.form_invalid(form)

    def form_invalid(self, form):
        context = self.get_context_data(form=form)
        context['formError'] = self.formError
        return self.render_to_response(context)


class AddLibrarian(PermissionRequiredMixin, FormView):
    template_name = 'accounts_add_librarian.html'
    form_class = EditLibrarianForm
    permission_required = 'accounts.add_librarian'

    form_error = ""

    def form_valid(self, form):
        success = True
        data = form.cleaned_data
        if data['password'] != data['confirm_password']:
            success = False
            self.form_error += 'Пароли не совпадают\n'
        if success:
            user = User.objects.register_librarian(data)
            if not user:
                success = False
                self.form_error += 'Email занят\n'
        if not success:
            return self.form_invalid(form)

        return super(AddLibrarian, self).form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(AddLibrarian, self).get_context_data()
        context['form_error'] = self.form_error
        context['library_list'] = library.objects.all()
        return context

    def get_success_url(self):
        return reverse_lazy('accounts:add_librarian')


class AddReader(AddLibrarian):
    template_name = 'accounts_add_reader.html'
    form_class = AddReaderForm
    permission_required = 'accounts.add_reader'


    def form_valid(self, form):
        success = True
        data = form.cleaned_data
        if data['password'] != data['confirm_password']:
            success = False
            self.form_error += 'Пароли не совпадают\n'
        if success:
            data['library'] = self.request.user.library
            user = User.objects.register_reader(data)
            if not user:
                success = False
                self.form_error += 'Email занят\n'
        if not success:
            return self.form_invalid(form)

        return super(AddLibrarian, self).form_valid(form)

    def get_success_url(self):
        return reverse_lazy('accounts:add_reader')


class SignupView(TemplateView):
    template_name = 'accounts_signup.html'


class ProfileLibrarianView(PermissionRequiredMixin, UpdateView):
    permission_required = 'accounts.add_reader'
    template_name = 'accounts_profile_librarian.html'
    form_class = EditProfileLibrarianForm

    def get_object(self, queryset=None):
        return self.request.user

    def get_context_data(self, **kwargs):
        context = super(ProfileLibrarianView, self).get_context_data()
        context["library_list"] = library.objects.all()
        return context


class ProfileReaderView(TemplateView):
    template_name = 'accounts_profile_reader.html'

    def get_context_data(self, **kwargs):
        context = super(ProfileReaderView, self).get_context_data()
        context['reader'] = self.request.user
        return context
    
    def post(self, request, *argw, **kwargs):
        request.user.edit_request = True
        request.user.save()
        return super(ProfileReaderView, self).post( request, *argw, **kwargs)


class ProfileReaderEditView(PermissionRequiredMixin, UpdateView):
    template_name = 'accounts_profile_reader.html'
    permission_required = 'accounts.add_reader'
    model = User
    pk_url_kwarg = 'pk'
    context_object_name = 'reader'
    form_class = EditReaderForm

    def post(self, request, *args, **kwargs):
        reader = self.get_object()
        if not reader.edit_request:
            return redirect(reader.get_absolute_url())
        return super(ProfileReaderEditView, self).post(request, *args, **kwargs)

    def form_valid(self, form):
        data = form.cleaned_data
        passwd = data['password']
        if passwd:
            reader = self.get_object()
            reader.set_password(passwd)
            reader.save()
        return super(ProfileReaderEditView, self).form_valid(form)

    def get_context_data(self, **kwargs):
        return super(ProfileReaderEditView, self).get_context_data()


class LogoutView(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return redirect('/')


class ChangeProfileRequestApiView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        request.user.edit_request = True
        request.user.save()

        return HttpResponse(json.dumps({"success":True}), content_type='application/json')