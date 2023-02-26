FROM node
COPY . /front-end
WORKDIR /front-end
EXPOSE 3000
RUN npm install
CMD npm start


