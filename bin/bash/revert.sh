#!/bin/sh

echo "\n"

git reset --hard "$1"

git push origin HEAD --force

echo "\n"
