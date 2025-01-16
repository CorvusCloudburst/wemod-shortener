#!/usr/bin/env bash

if command -v php &> /dev/null; then
  echo "PHP is already installed. Run \"make php-uninstall\", then run this script again."
  exit 1
fi

if command -v composer &> /dev/null; then
  echo "Composer is already installed. Run \"make php-uninstall\", then run this script again."
  exit 1
fi

brew install php@8.4
brew link php@8.4
brew install composer --ignore-dependencies
