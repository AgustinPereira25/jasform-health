FROM serversideup/php:8.2-fpm-nginx

ENV SSL_MODE mixed

COPY . /var/www/html/
COPY ./production/jasform.com.origin.pem /etc/ssl/web/jasform.com.origin.pem
COPY ./production/jasform.com.origin.key /etc/ssl/web/jasform.com.origin.key
COPY ./production/origin_ca_rsa_root.pem /etc/ssl/web/origin_ca_rsa_root.pem
COPY ./production/https.conf /etc/nginx/site-opts.d/https.conf

RUN mv /var/www/html/.env /var/www/html/.env.ori
RUN mv /var/www/html/.env.prod /var/www/html/.env
RUN mv /var/www/html/public/build.bk /var/www/html/public/build
RUN chown -R webuser:webgroup /var/www/html/

EXPOSE 80
EXPOSE 443