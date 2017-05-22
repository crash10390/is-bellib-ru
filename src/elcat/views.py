from django.views.generic import CreateView, DetailView, View
from django.contrib.auth.mixins import PermissionRequiredMixin, LoginRequiredMixin
from haystack.generic_views import SearchView
from django.shortcuts import HttpResponse
from accounts.models import BookOrder, User, IssuedBooks
from .models import *
from .forms import AddBookForm
import json


class AddBookView(CreateView, PermissionRequiredMixin):
    form_class = AddBookForm
    template_name = 'add_book.html'
    permission_required = 'accounts.add_book'

    def get_context_data(self, **kwargs):
        context = super(AddBookView, self).get_context_data()
        context["bbk1_list"] = bbk1.objects.all()
        context["bbk2_list"] = bbk2.objects.all()
        context["genre_list"] = genre.objects.all()
        context["content_list"] = content.objects.all()
        context["publisher_list"] = publisher.objects.all()
        context["language_list"] = language.objects.all()
        context["shelfplace_list"] = shelfplace.objects.all()
        context["library_list"] = library.objects.all()
        return context


class SearchResult(SearchView):
    template_name = 'search_result.html'

    def get_queryset(self):
        queryset = super(SearchResult, self).get_queryset()
        # further filter queryset based on some set of criteria
        return queryset

    def get_context_data(self, *args, **kwargs):
        context = super(SearchResult, self).get_context_data(*args, **kwargs)
        # do something
        return context

    class Meta:
        model = book


class ApiBookInfoView(LoginRequiredMixin, DetailView):
    pk_url_kwarg = 'pk'
    model = book

    def get(self, request, *args, **kwargs):
        bookInfo = self.get_object()
        result = {
            "card": bookInfo.get_book_card()
        }
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiBookOrderView(LoginRequiredMixin, DetailView):
    pk_url_kwarg = 'pk'
    model = book

    def get(self, request, *args, **kwargs):
        bookInfo = self.get_object()
        result = {}
        if BookOrder.objects.get_order_for_book(bookInfo).count() == 0:
            orderBook = BookOrder(reader=request.user, book=bookInfo)
            orderBook.save()
            result = {
                "success": True
            }
        else:
            result = {
                "error": "Книга уже заказана"
            }
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiReadersView(LoginRequiredMixin, View):
    def get(self, request, *args, **kwargs):
        users = User.objects.filter(library=request.user.library)
        result = [{"id": user.id, "name": user.get_short_name()} for user in users]
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiBookIssueView(PermissionRequiredMixin, DetailView):
    permission_required = 'accounts.add_book'
    pk_url_kwarg = 'pk'
    model = book

    def post(self, request, *args, **kwargs):
        book_info = self.get_object()
        reader_ticket_id = request.POST['reader']
        readers = User.objects.filter(ticket_number=reader_ticket_id)
        issued_book_count = IssuedBooks.objects.filter(book=book_info, reader=readers[0]).count()
        if issued_book_count > 0:
            result = {
                "error": "Книга уже выданна!"
            }
        else:
            if readers.count() > 0:
                issued_book = IssuedBooks(book=book_info, reader=readers[0])
                issued_book.save()
                result = {
                    "success": True
                }
            else:
                result = {"error": "Читательский билет не найден"}
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiBookBackView(PermissionRequiredMixin, DetailView):
    permission_required = 'accounts.add_book'
    pk_url_kwarg = 'pk'
    model = book

    def post(self, request, *args, **kwargs):
        bookInfo = self.get_object()
        issuedBook = IssuedBooks.objects.filter(book=bookInfo)
        issuedBook.delete()
        result = {
            "success": True
        }
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiBookProlongedView(PermissionRequiredMixin, DetailView):
    permission_required = 'accounts.add_book'
    pk_url_kwarg = 'pk'
    model = book

    def post(self, request, *args, **kwargs):
        bookInfo = self.get_object()
        issuedBook = IssuedBooks.objects.get(book=bookInfo)
        issuedBook.prolong()
        result = {
            "success": True
        }
        return HttpResponse(json.dumps(result), content_type='application/json')


class ApiBookCancellationView(PermissionRequiredMixin, DetailView):
    permission_required = 'accounts.add_book'
    pk_url_kwarg = 'pk'
    model = book

    def post(self, request, *args, **kwargs):
        bookInfo = self.get_object()
        bookInfo.isdeleted = True
        bookInfo.save()

        result = {
            "success": True
        }
        return HttpResponse(json.dumps(result), content_type='application/json')
