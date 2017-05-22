# coding=utf-8


from django.contrib import admin
from django import forms
from .models import book, bookstotal, booksatlibrary, author, bbk1, bbk2, genre, series, content, publisher, language, \
    shelfplace, library, librarytown


class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'library', 'librarytown', 'genre')
    search_fields = ('name',)
    list_filter = ('library',)
    raw_id_fields = (

        'bbk1', 'bbk2', 'genre', 'series', 'content', 'publisher', 'language', 'shelfplace', 'library', 'librarytown')


class BooksAtLibraryAdmin(admin.ModelAdmin):
    list_display = ('library',)


admin.site.register(book, BookAdmin)
admin.site.register(bookstotal)
admin.site.register(booksatlibrary, BooksAtLibraryAdmin)

admin.site.register(library)
admin.site.register(librarytown)
