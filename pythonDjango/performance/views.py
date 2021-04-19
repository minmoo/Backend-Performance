from django.shortcuts import render
from django.http import HttpResponse
import timeit
import requests
from django.db import connection
import os
# Create your views here.
def index(request):

    return HttpResponse("Hello")

def fileTest(request):
    start_time = timeit.default_timer()

    count = 100
    # 100개의 파일 만들고 100개의 줄을 쓰고 100개의 줄을 읽기

    # 1. 파일 만들기 + 쓰기
    for i in range(count):
        with open(f"data/{i}file", "w") as f:
            for j in range(count):
                f.write(f"{i} 파일의 {j} 번째 줄 입니다.\n")
    
    # 2.파일 읽기
    for i in range(count):
        with open(f"data/{i}file", "r") as f:
            lines = f.readlines()
    
    # 3. 파일 제거
    for i in range(count):
        os.remove(f"data/{i}file")


    terminate_time = timeit.default_timer()

    print(f"실행시간: {terminate_time - start_time} 초 ")

    return HttpResponse("success")


def httpTest(request):
    # https://22f3baa6-14d8-403f-959e-476ca9d4376e.mock.pstmn.io
    response = requests.get('https://22f3baa6-14d8-403f-959e-476ca9d4376e.mock.pstmn.io/test')
    print(response.text)

    return HttpResponse("success")

def dbTest(request):
    start_time = timeit.default_timer()
    count = 10
    with connection.cursor() as cursor:
        # Insert
        for i in range(count):
            cursor.execute(f"INSERT INTO cbot_token VALUES ('id{i}', 'cntt{i}', 'test', 'Y', '163235', 'now()', '163235', 'now()')")
        
        # Select
        cursor.execute("SELECT * FROM cbot_token WHERE cbot_enty_grp_id='test'")
        rows = cursor.fetchall()

        # Delete
        cursor.execute("DELETE FROM cbot_token WHERE cbot_enty_grp_id='test'")
        
    terminate_time = timeit.default_timer()
    print(f"실행시간: {terminate_time - start_time} 초 ")

    return HttpResponse("success")