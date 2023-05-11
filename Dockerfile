FROM node:14-alpine

# 初始化工作目录
RUN mkdir -p /app/server
WORKDIR /app/server

# 复制 package.json
COPY package*.json /app/server/

# 安装依赖
RUN npm install

# 复制文件
COPY . /app/server/

RUN npm run build

# 开启 Dev
CMD ["npm", "run", "start:prod"]
