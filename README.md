# VMRS

## 简介

Congb19‘s Graduation Project - VMRS

基于协同过滤的交互式电影推荐系统，在提取用户和电影特征的基础上进行推荐，并进一步可视化推荐模型中的潜在语义空间，让用户更好地理解推荐结果。

## 技术栈

### CLIENT

待定

### SERVER

- koa2 版本：^2.7.0
- mysql2 版本：^2.2.5
- mysql server 版本：5.7.23
- sequelize 版本：^5.x.x

## 规范

- 数据库

  表名：每个单词首字母大写，不使用复数，例如 MovieInfo，User

  字段名：驼峰，不使用复数，例如 userName，userId

- 前端

  组件名：// 小写，“-”连接，例如 date-picker

  类名：BEM 命名法

- 服务端

## 环境

### CLIENT

待定

### SERVER

`cd VMRS-server`

`yarn`

`yarn dev`

API BaseUrl: http://localhost:8002/api/...

> 服务器运行

`cd VMRS-server`

`npm install`

`npm run prd`

API BaseUrl: http://www.congb19.top/vmrs/api/...
