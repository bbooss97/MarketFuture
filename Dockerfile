FROM node 
WORKDIR /usr/src/app
COPY . .

RUN npm install mysql
CMD ["node","prova.js"]
EXPOSE 3000