#!/bin/bash
set -e

composer install --no-interaction --ignore-platform-reqs
npm install --legacy-peer-deps
npm run build
php artisan key:generate --force
php artisan migrate --force
php artisan storage:link --force || true
