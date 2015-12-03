
.PHONY: test
all: build run

build:
	@echo "Building"
	docker build --rm=true --force-rm=true -t sender1 .

test:
	@echo "Testing"

run:
	docker run -it --rm --name sender1 sender1

run-old:
	while :; do node src/send.js; sleep 1; done
stop:


clean:
	@echo "Cleaning"
