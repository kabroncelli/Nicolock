from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Dealer
from .serializers import DealerSerializer
from nicolock.core.mixins import AllowAny


class DealerList(AllowAny, APIView):
    serializer_class = DealerSerializer

    def get_dealers(self, postal_codes):
        dealers = Dealer.objects.none()
        for postal_code in postal_codes:
            dealers = dealers | Dealer.objects.filter(postal_code=postal_code)
        return dealers

    def get(self, request, *args, **kwargs):
        postal_codes = self.request.GET.getlist('postal_code')
        dealers = self.get_dealers(postal_codes)
        return Response(
            DealerSerializer(dealers, many=True).data, status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        postal_codes = self.request.data.get('postal_codes', [])
        dealers = self.get_dealers(postal_codes)
        return Response(
            DealerSerializer(dealers, many=True).data, status=status.HTTP_200_OK
        )
