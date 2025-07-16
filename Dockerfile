FROM httpd:2.4

COPY .cicd/config/my-httpd.conf /usr/local/apache2/conf/httpd.conf

# copy application build files
COPY ./build/ /usr/local/apache2/htdocs/