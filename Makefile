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
	git clone http://github.com/creationix/nvm.git .nvm
	@make versions
	composer install
	composer run post-autoload-dump
	composer run post-root-package-install
	composer run post-create-project-cmd
	composer run post-update-cmd
	npm install
	npm run build
	php artisan migrate:fresh --seed

clean:
	# $(WARN) "make clean" does aggressive clean up $(END)
	rm -rf vendor
	rm -rf node_modules

fresh: clean init

versions:
	@if composer -V > /dev/null; then echo "$(OK) Composer is installed! $(END)"; else echo "$(WARN) run 'brew install composer' $(END)"; exit 1; fi
	@if php -v | grep "v8.4.\d"; then echo "$(OK) PHP 8.4 is installed $(END)"; else echo "$(WARN) Run 'make php-install' $(END)"; exit 1; fi

php-uninstall:
	sh ./bin/php-uninstall.sh
	# $(OK) All done! $(END)

php-install:
	sh ./bin/php-install.sh
	@make pre-flight

pre-flight:
	# $(INFO) Running pre-flight checks $(END)
	@sed -i '' "s|short_open_tag = Off|short_open_tag = On|g" $(PHP_INI)
	@if composer check-platform-reqs | grep "failed"; then echo "$(WARN) run 'brew install php' $(END)"; exit 1; else echo "$(OK) PHP is good! $(END)"; fi
	@if php -r "ini_get('short_open_tag') || exit(1);"; then echo "$(OK) PHP short tags are on $(END)"; else echo "$(WARN) Turn short_open_tag on in php.ini $(END)"; php --ini; exit 1; fi
	# $(INFO) Auto-starting php-fpm $(END)
	brew services restart php@8.4
	@if brew services list | grep php | grep started; then echo "$(OK) php-fpm is good! $(END)"; else echo "$(WARN) php-fpm not started: 'brew services start php' $(END)"; exit 1; fi
	@make versions
