FROM node:18-alpine
ENV DATABASE_URL="mysql://root:1234@192.168.1.144:6603/svaults"
ENV PORT="8081"
WORKDIR /sync
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
CMD [ "npm", "start" ]
EXPOSE 8081
