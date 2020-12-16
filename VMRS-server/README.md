# VMRS-server

## API-doc

### 用户

- url

  `POST` /api/users/signup

- Parameters

  ```javascript
  {
    "username": "username",
    "password": "ppp"
  }
  ```

- Responses

  - Code: 200

  - Description: 注册

  - Example Value:

  ```javascript
  {
    "code": 200,
    "msg": "用户注册成功",
    "data": {
      "a": "ok"
    }
  }
  ```
