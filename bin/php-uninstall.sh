#!/usr/bin/env bash

phpIni=""
if command -v php &> /dev/null; then
  phpIni=$(php --ini | grep "Loaded Configuration File" | awk '{print $4}')
fi

if command -v pecl &> /dev/null; then
  echo "uninstalling pecl packages..."
  pecl uninstall rdkafka
  pecl uninstall xdebug
  if [ -n "$phpIni" ]; then
    sed -i '' "s|extension=\"rdkafka.so\"||g" "$phpIni"
    sed -i '' "s|zend_extension=\"xdebug.so\"||g" "$phpIni"
  fi
  echo "pecl packages uninstalled"
fi

composerInstalls=$(brew list | grep composer)
if [ -n "$composerInstalls" ]; then
  echo "Found Homebrew Composer installations: $composerInstalls"
  for composerInstall in $composerInstalls; do
    echo "Uninstalling ${composerInstall} ..."
    brew unlink "$composerInstall"
    brew uninstall "$composerInstall"
    echo "Uninstalled ${composerInstall}"
  done
  echo "All Homebrew Composer installations uninstalled"
fi

if command -v composer &> /dev/null; then
  echo "Composer is installed outside of Homebrew. Uninstall Composer manually, then run this script again."
  exit 1
fi

phpInstalls=$(brew list | grep php)
if [ -n "$phpInstalls" ]; then
  echo "Found Homebrew PHP installations: $phpInstalls"
  for phpInstall in $phpInstalls; do
    echo "Uninstalling ${phpInstall} ..."
    brew unlink "$phpInstall"
    brew uninstall "$phpInstall"
    echo "Uninstalled ${phpInstall}"
  done
  echo "All Homebrew PHP installations uninstalled"
fi

if command -v php &> /dev/null; then
  echo "PHP is installed outside of Homebrew. Uninstall this PHP version manually, then run this script again."
  exit 1
fi

killall php-fpm || true
