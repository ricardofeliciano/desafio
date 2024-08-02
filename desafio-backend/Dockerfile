FROM php:8.2

ENV DB_HOST=db
ENV DB_PORT=3306
ENV DB_DATABASE=desafio
ENV DB_USERNAME=admin
ENV DB_PASSWORD=123


RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

RUN apt-get update && apt-get install -y \
    default-mysql-client \
    libpq-dev \
    && docker-php-ext-install pdo_mysql mysqli




WORKDIR /app


COPY composer.json composer.lock ./


RUN mkdir -p database/seeds
RUN mkdir -p database/factories

COPY . .

RUN composer install


CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
