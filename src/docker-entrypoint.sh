#!/bin/sh

echo "COLLECT STATIC FILES"
python manage.py collectstatic --noinput

echo "MIGRATE DB"
python manage.py migrate

echo "UPDATE SEARCH INDEX"
#python manage.py update_index

NUM_WORKERS=${1:-3}
BIND=${2:-0.0.0.0:8000}
# Start server
echo "Starting server"
exec gunicorn instabook.wsgi:application \
 --workers $NUM_WORKERS \
 --bind=$BIND \
 --log-file=logs/gunicorn.log