from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path("fileTest/", views.fileTest, name="fileTest" ),
    path("httpTest/", views.httpTest, name="httpTest"),
    path("dbTest/", views.dbTest, name="dbTest")
]