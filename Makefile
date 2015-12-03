.PHONY: test
all: stop build run

build:
	docker-compose build

run-rabbitmq:
	docker-compose --x-networking up -d rabbitmq

run-mongodb:
	docker-compose --x-networking up -d mongodb

run-receiver:
	docker-compose --x-networking up -d receiver

run-sender1:
	docker-compose --x-networking up -d sender1

run-sender2:
	docker-compose --x-networking up -d sender2

sleep:
	sleep 10

run: run-rabbitmq run-mongodb sleep run-receiver run-sender1 run-sender2
		@echo "All services up!"

stop-sender1:
	docker-compose stop sender1
	docker-compose rm -f sender1
	docker rmi rabbitmqtest_sender1 || true

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

stop: stop-sender1 stop-sender2 stop-receiver stop-mongodb stop-rabbitmq

restart-sender1: stop-sender1 run-sender1
	docker-compose logs sender1

logs:
	docker-compose logs

push:
	@echo "======= PUSHING CONTAINER ======\n"

clean:
	@echo "Cleaning"
