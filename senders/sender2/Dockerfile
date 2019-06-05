FROM java:latest
ADD ./target/rabbitmq-sender-1.0-SNAPSHOT.jar /usr/local/bin
ENTRYPOINT ["java", "-jar", "/usr/local/bin/rabbitmq-sender-1.0-SNAPSHOT.jar"]
CMD [""]
