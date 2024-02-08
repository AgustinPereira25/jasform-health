FROM serversideup/php:8.2-fpm-nginx

ENV SSL_MODE mixed

WORKDIR /var/www/html

RUN apt update -y && apt upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . /var/www/html/
COPY ./production/certs/cert1.pem /etc/ssl/web/cert1.pem
COPY ./production/certs/privkey1.pem /etc/ssl/web/privkey1.pem
COPY ./production/certs/fullchain1.pem /etc/ssl/web/fullchain1.pem
COPY ./production/https.conf /etc/nginx/site-opts.d/https.conf

RUN mv /var/www/html/.env /var/www/html/.env.ori
RUN mv /var/www/html/production/.env.prod /var/www/html/.env
RUN mv /var/www/html/public/build.bk /var/www/html/public/build
RUN chown -R webuser:webgroup /var/www/html/

EXPOSE 80
EXPOSE 443
