# 定义我们需要从哪个镜像进行构建
FROM node:8

# 在镜像中创建一个文件夹存放应用程序代码，这将是你的应用程序工作目录
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

EXPOSE 3010

CMD [ "node", "index.js" ]