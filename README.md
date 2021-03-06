# VMRS

## 简介

Congb19‘s Graduation Project - VMRS

基于协同过滤的交互式电影推荐系统，在提取用户和电影特征的基础上进行推荐，并进一步可视化推荐模型中的潜在语义空间，让用户更好地理解推荐结果。

## 技术栈

### CLIENT

- 主要框架：taro + react
- UI 组件库：taro UI，版本：^3.0.0-alpha.3

### SERVER

- 主要框架：node + koa2
- 数据库：mysql2，版本：^2.2.5；mysql server 版本：5.7.23
- ORM 框架：sequelize 版本：^5.x.x

## 规范

- 数据库

  表名：每个单词首字母大写，不使用复数，例如 `MovieInfo`，`User`

  字段名：驼峰，不使用复数，例如 `username`，`userid`

- 前端

  组件名：每个单词首字母大写，例如 `AtLoadMore`

  css 类名：BEM 命名法，Block\_\_Element--Modifiers， 例如 `.people__head--small`

- 服务端

## 运行环境

### CLIENT

> h5 调试

`cd VMRS-server`

`yarn dev:h5`

> 小程序

### SERVER

> 本地调试

`cd VMRS-server`

`yarn`

`yarn dev`

API BaseUrl: http://localhost:8002/api/...

> 服务器运行

`cd VMRS-server`

`npm install`

`npm run prd`

API BaseUrl: http://www.congb19.top/vmrs/api/...
