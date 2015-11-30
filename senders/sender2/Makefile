
.PHONY: test
all: build

build:
	@echo "Building"
	mvn clean install

test:
	@echo "Testing"

build-docker:
	docker build -t sender2 .

clean:
	@echo "Cleaning"
	mvn clean
