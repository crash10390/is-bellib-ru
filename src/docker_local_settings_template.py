SECRET_KEY = ')%j71x_*dfgdfgf*@yhggyj59puq@4z7zdfgdfgdf)^@snm1fdgdfg&gn$0kqn5dfgdgr4hrqfl)sadcf'
ADMINS = (
     ('Sprinter', 'Sprinter_2006.90@mail.ru'),
)
DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
        'NAME':     'new_www_book_base',                      # Or path to database file if using sqlite3.
        # The following settings are not used with sqlite3:
        'USER':     'qduser',
        'PASSWORD': 'poi4vtyz',
        'HOST':     'mysql',                      # Empty for localhost through domain sockets or '127.0.0.1' for localhost through TCP.
        'PORT':     '',
        'OPTIONS': {'charset': 'utf8mb4'}                     # Set to empty string for default.
    }
}

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'instabook.search_backend.SolrEngine',
        'URL': 'http://solr:8983/solr/mycore'

    },
}
ALLOWED_HOSTS = ['is.bellib.ru', '0.0.0.0']
