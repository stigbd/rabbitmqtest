.PHONY: test
all: stop build start

build:
	docker-compose build

start-rabbitmq:
	docker-compose  up -d rabbitmq

start-mongodb:
	docker-compose  up -d mongodb

start-receiver:
	docker-compose  up -d  --build receiver

start-sender1:
	docker-compose  up -d  --build sender1

start-sender2:
	docker-compose  up -d --build sender2

sleep:
	sleep 10

start:
	docker-compose  up -d
	@echo "All services up!"

stop-sender1:
	docker-compose stop sender1
	docker-compose rm -f sender1

stop-sender2:
	docker-compose stop sender2
	docker-compose rm -f sender2

stop-receiver:
	docker-compose stop receiver
	docker-compose rm -f receiver

stop-mongodb:
	docker-compose stop mongodb
	docker-compose rm -f mongodb

stop-rabbitmq:
	docker-compose stop rabbitmq
	docker-compose rm -f rabbitmq

stop:
	docker-compose stop
	docker-compose rm --all

restart-sender1: stop-sender1
	docker rmi rabbitmqtest_sender1 || true
	docker-compose --x-networking up -d sender1
	docker-compose logs sender1

logs:
	docker-compose logs

push:
	@echo "======= PUSHING CONTAINER ======\n"

clean:
	@echo "Cleaning"
