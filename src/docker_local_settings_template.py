import os

SECRET_KEY = ')%j71x_*dfgdfgf*@yhggyj59puq@4z7zdfgdfgdf)^@snm1fdgdfg&gn$0kqn5dfgdgr4hrqfl)sadcf'
ADMINS = (
    ('Sprinter', 'Sprinter_2006.90@mail.ru'),
)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME'),

        'USER': os.getenv('DB_USER_NAME'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': 'mysql',
        'PORT': '',
        'OPTIONS': {'charset': 'utf8mb4'}
    }
}

EMAIL_HOST = os.getenv('EMAIL_HOST'),
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER'),
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL'),
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD'),
EMAIL_PORT = 587
EMAIL_USE_TLS = True

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': 'instabook.search_backend.SolrEngine',
        'URL': 'http://solr:8983/solr/mycore'

    },
}
ALLOWED_HOSTS = ['is.bellib.ru', '0.0.0.0']
