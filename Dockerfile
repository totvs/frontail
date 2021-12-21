FROM node:12-buster-slim

WORKDIR /frontail
ADD . .
RUN npm install --production

EXPOSE 9001
CMD ["--help"]

ENTRYPOINT ["bash", "/frontail/docker-entrypoint.sh"]