#!/bin/bash

# Define MySQL data directory
MYSQL_DATA_DIR="./database/mysql_data"
MYSQL_SOCKET="./database/mysql.sock"

# Initialize MySQL/MariaDB if data directory doesn't exist
if [ ! -d "$MYSQL_DATA_DIR" ]; then
    echo "Initializing MariaDB data directory..."
    mkdir -p "$MYSQL_DATA_DIR"
    mysql_install_db --user=$(whoami) --datadir="$MYSQL_DATA_DIR" --auth-root-authentication-method=normal
fi

# Start MariaDB if not running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "Starting MariaDB..."
    mysqld --datadir="$MYSQL_DATA_DIR" --bind-address=127.0.0.1 &
    
    # Wait for MySQL to start
    echo "Waiting for MariaDB to start..."
    until mysqladmin ping -h 127.0.0.1 --silent; do
        sleep 1
    done
    echo "MariaDB is ready!"
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    # Configure for MySQL in Replit
    sed -i 's/DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env
    sed -i 's/DB_HOST=.*/DB_HOST=127.0.0.1/' .env
    sed -i 's/DB_PORT=.*/DB_PORT=3306/' .env
    sed -i 's/DB_DATABASE=.*/DB_DATABASE=web3/' .env
    sed -i 's/DB_USERNAME=.*/DB_USERNAME=root/' .env
    sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=/' .env
fi

# Create database if it doesn't exist
mysql -u root -h 127.0.0.1 -e "CREATE DATABASE IF NOT EXISTS web3;"

# Install dependencies if vendor directory is missing
if [ ! -d vendor ]; then
    echo "Installing Composer dependencies..."
    composer install
    php artisan key:generate
fi

# Install node modules if missing
if [ ! -d node_modules ]; then
    echo "Installing NPM dependencies..."
    npm install
    npm run build
fi

# Run migrations
php artisan migrate --force

echo "Setup complete!"
