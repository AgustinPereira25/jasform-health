FROM serversideup/php:8.2-fpm-nginx-v2.2.1

ENV SSL_MODE mixed

WORKDIR /var/www/html
COPY . .

RUN composer install --optimize-autoloader --no-dev
RUN apt update -y && apt upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ./production/certs/cert1.pem /etc/ssl/web/cert1.pem
COPY ./production/certs/privkey1.pem /etc/ssl/web/privkey1.pem
COPY ./production/certs/fullchain1.pem /etc/ssl/web/fullchain1.pem
COPY ./production/certs/jasform.com.origin.pem /etc/ssl/web/jasform.com.origin.pem
COPY ./production/certs/jasform.com.origin.key /etc/ssl/web/jasform.com.origin.key
COPY ./production/certs/origin_ca_rsa_root.pem /etc/ssl/web/origin_ca_rsa_root.pem

RUN mv -f /var/www/html/production/.env.prod /var/www/html/.env
RUN chown -R webuser:webgroup /var/www/html/

EXPOSE 80
EXPOSE 443
