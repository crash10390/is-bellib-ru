from django.views.generic import ListView, DetailView
from django.db import connection
from django.contrib.auth.mixins import PermissionRequiredMixin
from .models import Report


class ListReports(PermissionRequiredMixin, ListView):
    model = Report
    template_name = 'reports_list.html'
    context_object_name = "reports"
    permission_required = 'reports.exec_query'


class ExecReport(PermissionRequiredMixin, DetailView):
    model = Report
    template_name = 'reports_exec.html'
    context_object_name = 'report'
    permission_required = 'reports.exec_query'
    pk_url_kwarg = 'pk'

    def get(self, request, *args, **kwargs):
        report = self.get_object()
        self.object = report
        cursor = connection.cursor()
        context = self.get_context_data()
        try:
            cursor.execute(report.query)
            collums = [coll[0] for coll in cursor.description]
            rows = [row for row in cursor.fetchall()]
            context["collums"] = collums
            context["rows"] = rows
        except Exception as ex:
            context["error"] = ex
        return self.render_to_response(context)
