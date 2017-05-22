from django import template
from ..models import Message
register = template.Library()


@register.inclusion_tag('messages_inbox_table.html', takes_context=True, name='messages_inbox_table')
def messages_inbox_table(context, args):
    context["messages"] = Message.objects.get_inbox(context.request.user)
    return context



