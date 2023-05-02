FROM akraradets/base-ubuntu:22.04

WORKDIR /var/www/html
EXPOSE 80 443

RUN apt update && apt upgrade -y

# Install Apache2
RUN apt install -y apache2
# Install php and php-apache
RUN apt install -y php libapache2-mod-php
# Install other php extension
RUN apt install -y php-mysql php-cli php-curl php-xml php-intl php-mbstring 
RUN apt install -y php-ldap
# RUN apt install -y php-mcrypt 
# Install composer
RUN apt install -y composer curl
# Other util
RUN apt install -y vim

# CMD tail -f /dev/null
CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]