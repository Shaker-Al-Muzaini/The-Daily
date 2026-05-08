#!/bin/bash
set -e

echo "Installing PHP dependencies..."
composer install --no-interaction --ignore-platform-reqs

echo "Installing Node dependencies..."
npm install --legacy-peer-deps

echo "Building frontend assets..."
npm run build

echo "Generating app key..."
php artisan key:generate --force

echo "Clearing config cache..."
php artisan config:clear
php artisan cache:clear

echo "Running database migrations..."
php artisan migrate --force

echo "Creating storage link..."
php artisan storage:link --force || true

echo "Build complete!"
