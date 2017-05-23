# coding=utf-8
from django.db import models
from django.utils import timezone


# Таблица с книгами Белоярской ЦБС --------------------------------
class book(models.Model):
    book_id = models.BigIntegerField(primary_key=True, unique=True)
    name = models.CharField(max_length=512)
    inventory = models.IntegerField(null=True)
    volume = models.CharField(max_length=50, null=True)
    author_id = models.ManyToManyField('author')
    bookauthor_id = models.BigIntegerField()
    isbn = models.CharField(max_length=20, null=True)
    isbn10 = models.CharField(max_length=20, null=True)
    bbk1 = models.ForeignKey('bbk1')
    bbk2 = models.ForeignKey('bbk2')
    genre = models.ForeignKey('genre')
    series = models.ForeignKey('series')
    content = models.ForeignKey('content')
    publisher = models.ForeignKey('publisher')
    year = models.IntegerField()
    pages = models.IntegerField()
    language = models.ForeignKey('language')
    price = models.FloatField()
    shelfplace = models.ForeignKey('shelfplace')
    library = models.ForeignKey('library')
    librarytown = models.ForeignKey('librarytown' ,blank=True, null=True)
    isdeleted = models.BooleanField(default=False)

    def __str__(self):
        #       return unicode(self.Name, self.Library)
        return u'%s | %s | %s' % (self.name, self.library, self.librarytown)

    def get_book_card(self):
        result = ""
        for book_author in self.author_id.all():
            result += "%s " % book_author.name
        if self.name:
            result += "%s ;" % self.name
        if self.content:
            result += "[%s] " % self.content
        if self.genre is not None and self.genre.name != 'null':
            result += "%s; " % self.genre
        if self.publisher and self.publisher.city:
            result += " - %s: %s ; " % (self.publisher.city, self.publisher.name)
        if self.pages != 'null':
            result += " - %s c. %s; " % (self.pages, self.series if self.series.name != 'null' else "")
        if self.isbn != 'null':
            result += " - %s;" % self.isbn
        if self.inventory != 'null':
            result += " - инв. %s;" % self.inventory
        if self.price:
            result += " - %s " % self.price
        return result

    def get_display_name(self):
        return '%s "%s"' % (self.author_id.all()[0].name, self.name)

    @property
    def is_ordered(self):
        return self.bookorder_set.all().filter(closed=False).count() > 0

    @property
    def is_issued(self):
        return self.issuedbooks_set.all().count() > 0


class author(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    author_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица с ББК1 ---------------------------------------------------
class bbk1(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    bbk1_id = models.BigIntegerField(primary_key=True)
    code1 = models.CharField(max_length=30)
    description1 = models.CharField(max_length=300)

    def __str__(self):
        return u'%s | %s' % (self.code1, self.description1)


# def __str__(self):
#       return unicode(self.Description1)

# Таблица с ББК2 ---------------------------------------------------
class bbk2(models.Model):
    bbk2_id = models.BigIntegerField(primary_key=True)
    code2 = models.CharField(max_length=30)
    description2 = models.CharField(max_length=300)

    def __str__(self):
        return u'%s | %s' % (self.code2, self.description2)


# Таблица жанров ---------------------------------------------------
class genre(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    genre_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица серий книг -----------------------------------------------
class series(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    series_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица контента -------------------------------------------------
class content(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    content_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица издательств ----------------------------------------------
class publisher(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    publisher_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)
    city = models.CharField(max_length=200)

    def __str__(self):
        return self.name


# Таблица языков книг ----------------------------------------------
class language(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    language_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица мест на полках -------------------------------------------
class shelfplace(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    shelfplace_id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица населенных пунктов где расположены библиотеки ------------
class librarytown(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    librarytown_id = models.BigIntegerField(primary_key=True)
    town = models.CharField(max_length=200)

    def __str__(self):
        return self.town


# Таблица библиотек ------------------------------------------------
class library(models.Model):
    #    Count_id = models.AutoField(primary_key=True)
    library_id = models.BigIntegerField(primary_key=True)
    city = models.ForeignKey(librarytown, verbose_name='Населенный пункт', blank=True, null=True)
    name = models.CharField(max_length=512)

    def __str__(self):
        return self.name


# Таблица с общим количеством книг из отдела комплектования
class bookstotal(models.Model):
    booksfromok = models.IntegerField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return u'Количество книг на: %s' % (self.date)


# Таблица с количеством книг по библиотекам
class booksatlibrary(models.Model):
    library = models.ForeignKey('library')
    booksfromok = models.IntegerField()
    date = models.DateTimeField(auto_now=True)

    #    def __str__(self):
    #        return u'Количество книг в: %s' % (library.library_id)
