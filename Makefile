SHELL := /bin/bash

OK   := $(shell printf "\e[2D\e[32m✅ ")
WARN := $(shell printf "\e[2D\e[33m⚠️ \e[1m")
INFO := $(shell printf "\e[2D\e[36mℹ️ ")
END  := $(shell printf "\e[0m")

PHP_INI_PATH = $(shell php -i | grep "(php.ini)" | grep -o "\/.*")
PHP_INI = "$(PHP_INI_PATH)/php.ini"

.PHONY: default init update clean fresh up pre-flight versions

default: update

init:
  make preflight
  composer install
	npm install
  cp -n .env.example .env || true
  composer run dev

update:
  # $(INFO) Updating... $(END)
	make pre-flight
	git pull
	composer install
	npm install

clean:
	# $(WARN) "make clean" does aggressive clean up $(END)
	rm -rf node_modules
	rm -rf vendor

fresh: clean init

up:
  composer run dev

preflight:
  @sed -i '' "s|short_open_tag = Off|short_open_tag = On|g" $(PHP_INI)
	@if composer check-platform-reqs | grep "failed"; then echo "$(WARN) run 'brew install php' $(END)"; exit 1; else echo "$(OK) PHP is good! $(END)"; fi
	@if php -r "ini_get('short_open_tag') || exit(1);"; then echo "$(OK) PHP short tags are on $(END)"; else echo "$(WARN) Turn short_open_tag on in php.ini $(END)"; php --ini; exit 1; fi

versions:
	@if composer -V > /dev/null; then echo "$(OK) Composer is installed! $(END)"; else echo "$(WARN) Please install composer (On Macs, run 'brew install composer') $(END)"; exit 1; fi
	@if composer -V | awk -v VERSION="2.1.3" -f ./bin/version_check.awk; then echo "$(OK) Composer is good! $(END)"; else echo "$(WARN) run 'composer self-update --2' $(END)"; exit 1; fi
	@if node -v > dev/null; then echo "$(OK) node is good! $(END)"; else echo "$(WARN) run 'nvm i or manually install $(END)"; exit 1; fi
	@if npm -v > dev/null; then echo "$(OK) npm is good! $(END)"; else echo "$(WARN) run 'npm i' or manually install $(END)"; exit 1; fi
	@if php -v | grep "v8.4.\d"; then echo "$(OK) PHP 8.4 is installed $(END)"; else echo "$(WARN) Run 'make php-install' $(END)"; exit 1; fi
	@if php -i | grep -E kafka.*enabled > /dev/null; then echo "$(OK) Kafka is enabled $(END)"; else echo "$(WARN) Consult the README for installing Kafka if you wish to use the data pipeline locally $(END)"; fi
	@if npm whoami > /dev/null; then echo "$(OK) Authenticated with npm $(END)"; else echo "$(WARN) Run 'npm login' to login as videoblocks-dev and get access to private npm repositories $(END)"; fi
