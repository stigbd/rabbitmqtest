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

stop-sender2:
	docker-compose stop sender2

stop-receiver:
	docker-compose stop receiver

stop-mongodb:
	docker-compose stop mongodb

stop-rabbitmq:
	docker-compose stop rabbitmq

stop: stop-sender1 stop-sender2 stop-receiver stop-mongodb stop-rabbitmq
	docker-compose rm -f

logs:
	docker-compose logs

push:
	@echo "======= PUSHING CONTAINER ======\n"

clean:
	@echo "Cleaning"
