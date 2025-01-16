SHELL := /bin/bash

OK   := $(shell printf "\e[2D\e[32m✅ ")
WARN := $(shell printf "\e[2D\e[33m⚠️ \e[1m")
INFO := $(shell printf "\e[2D\e[36mℹ️ ")
END  := $(shell printf "\e[0m")

.PHONY: init clean fresh

default: fresh

init:
	# $(INFO) Initializing... $(END)
	git pull
	composer install
	php artisan migrate:fresh --seed

clean:
	# $(WARN) "make clean" does aggressive clean up $(END)
	rm -rf vendor
	rm -rf node_modules

fresh: clean init