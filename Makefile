SHELL := /bin/bash

OK   := $(shell printf "\e[2D\e[32m✅ ")
WARN := $(shell printf "\e[2D\e[33m⚠️ \e[1m")
INFO := $(shell printf "\e[2D\e[36mℹ️ ")
END  := $(shell printf "\e[0m")

.PHONY: init clean fresh dependencies versions

default: fresh

init:
	# $(INFO) Initializing... $(END)
	@make versions
	@make dependencies
	npm install
	npm run build
	php artisan migrate:fresh --seed
	# $(OK) Initialization complete! To run the application, use: composer run dev $(END)

clean:
	# $(WARN) "make clean" does aggressive clean up $(END)
	rm -rf vendor
	rm -rf node_modules
	rm -rf .nvm

fresh: clean init

dependencies:
	# $(INFO) Reconciling dependencies... $(END)
	git clone http://github.com/creationix/nvm.git .nvm
	composer install
	composer run post-autoload-dump
	composer run post-root-package-install
	composer run post-create-project-cmd
	composer run post-update-cmd

versions:
	# $(INFO) Checking versions... $(END)
	@if php -v | grep "v8.4.\d"; then echo "$(OK) PHP 8.4 is installed $(END)"; else echo "$(WARN) Run 'make php-install' $(END)"; exit 1; fi
	@if composer -V > /dev/null; then echo "$(OK) Composer is installed! $(END)"; else echo "$(WARN) run 'brew install composer' $(END)"; exit 1; fi

php-uninstall:
	# $(INFO) Uninstalling PHP... $(END)
	sh ./bin/php-uninstall.sh
	# $(OK) All done! $(END)

php-install:
	# $(INFO) Installing PHP... $(END)
	sh ./bin/php-install.sh
	@if composer check-platform-reqs | grep "failed"; then echo "$(WARN) run 'brew install php' $(END)"; exit 1; else echo "$(OK) PHP is good! $(END)"; fi
