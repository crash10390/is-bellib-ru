from django.views.generic import FormView, TemplateView, UpdateView, View, DetailView
from django.utils import timezone
from django.shortcuts import redirect, HttpResponse
from django.urls import reverse_lazy
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from elcat.models import library
import json
from .forms import AuthForm, EditLibrarianForm, AddReaderForm, EditReaderForm, EditProfileLibrarianForm
from .models import User, UserReminderRequest


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
        return super(ProfileReaderView, self).post(request, *argw, **kwargs)


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

        return HttpResponse(json.dumps({"success": True}), content_type='application/json')


class RefreshPasswordView(DetailView):
    template_name = 'accounts_refresh_password.html'
    model = UserReminderRequest
    slug_field = 'token'
    slug_url_kwarg = 'token'

    def dispatch(self, request, *args, **kwargs):
        if not self.is_valid_token():
            context = self.get_context_data()
            context['token_is_expire'] = True
            return self.render_to_response(context)
        return super(RefreshPasswordView, self).dispatch(request, args, kwargs)

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        password = request.POST.get('password', None)
        password_confirm = request.POST.get('password_confirm', None)
        context = self.get_context_data()
        if not password or not password_confirm or password == '' or password_confirm == '':
            context['error'] = 'Заполните все поля'
            return self.render_to_response(context)
        if password != password_confirm:
            context['error'] = 'Пароли не совпадают'
            return self.render_to_response(context)
        req = self.get_object()
        req.user.set_password(password)
        req.user.save()
        req.delete()

        return redirect(reverse_lazy('accounts:login'))

    def is_valid_token(self):
        req = self.get_object()
        nowDate = timezone.now()
        delta = nowDate - req.created
        return delta.days <= 4


class ReminderSuccessView(TemplateView):
    template_name = 'accounts_reminder_success.html'


class ReminderView(TemplateView):
    template_name = 'accounts_reminder.html'

    MESSAGE_TEMPLATE = '''Вас приветсвует АБИС Белоярской ЦБС
Для восстановления забытого пароля посетите эту ссылку => http://is.bellib.ru%s
Если Вы не запрашивали смену пароля, то проигнорируйте это письмо.'''

    def post(self, request, *args, **kwargs):
        email = request.POST.get('email', None)
        context = self.get_context_data()
        if not email:
            context['error'] = 'Введите свой email'
            return self.render_to_response(context)
        try:
            user = User.objects.get(email=email)
            reminder = UserReminderRequest.objects.generate_new(user)
            user.email_user('Восстановление пароля', self.MESSAGE_TEMPLATE % reminder.get_absolute_url())
        except Exception as e:
            context['error'] = 'E-mail не найден'
            return self.render_to_response(context)
        return redirect(reverse_lazy('accounts:reminder_success'))
