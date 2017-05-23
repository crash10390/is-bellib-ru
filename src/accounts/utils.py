import string
import random


def rand_string(length=140):
    a = string.ascii_lowercase + string.digits
    return ''.join([random.choice(a) for i in range(length)])
