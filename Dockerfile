FROM registry.nj-prod-dce.saicstack.com/saicmotorcv/nginx-sc:1.1.0
MAINTAINER wanghuapeng <lijun16@saicmotor.com>

ADD ./dist /app/wwwroot/default

WORKDIR /app/wwwroot/default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]