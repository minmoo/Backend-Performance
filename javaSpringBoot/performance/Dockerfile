FROM openjdk:8-jdk

RUN mkdir /app
WORKDIR /app
COPY . /app

CMD ["./gradlew", "bootRun"]
EXPOSE 8000