FROM python:3.9

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN pip install django
RUN pip install -r requirements.txt
CMD ["python3", "manage.py", "runserver", "0:8000"]

EXPOSE 8000
