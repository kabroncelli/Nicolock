from django.db.models import CharField, FloatField
from django.db.models import Value

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import SalesRep, PostalCode
from .serializers import SalesRepSerializer
from nicolock.core.mixins import AllowAny


class SalesRepList(AllowAny, APIView):

    def get_salesreps(self, postal_codes):
        reps = []
        for postal_code in postal_codes:
            postal_code_obj = PostalCode.objects.filter(
                postal_code=postal_code).first()
            if postal_code_obj:
                reps += list(postal_code_obj.sales_reps.all().annotate(
                        postal_code=Value(postal_code, CharField()),
                        lat=Value(postal_code_obj.lat, FloatField()),
                        lng=Value(postal_code_obj.lng, FloatField())
                    )
                )
        return reps

    def post(self, request, *args, **kwargs):
        postal_codes = self.request.data.get('postal_codes', [])
        reps = self.get_salesreps(postal_codes)
        return Response(
            SalesRepSerializer(reps, many=True).data, status=status.HTTP_200_OK
        )

    def get(self, request, *args, **kwargs):
        postal_codes = self.request.GET.getlist('postal_code')
        reps = self.get_salesreps(postal_codes)
        return Response(
            SalesRepSerializer(reps, many=True).data, status=status.HTTP_200_OK
        )
