# FullSatck Todo App
[連結](https://fullstack-todoapp-pern.herokuapp.com/)
每個程式新手都會第一個做的 Web 小作品，利用 React Node.js Express 以及 Postgres 做出一個涵蓋前後端的 Todo App，並部署於 heroku 上。
讓每位使用者可以有自己專屬的 todo list，並提供夜間模式增加使用者體驗。

## 功能介紹
首頁：利用 JWT 認證的方式，必須登入或註冊才能夠進入頁面
![](https://i.imgur.com/M1hrvaL.png)
新增代辦事項：使用者可以簡易直接新增自己想要的 todo
編輯代辦事項：將 todo 做更改
刪除代辦事項：刪除不想要的代辦事項
搜尋代辦事項：透過關鍵字可以快速找到自己想要的 todo
![](https://i.imgur.com/5wazHt2.gif)

夜間模式： 利用 styled-componets 以及 React 實作出夜間模式的功能
![](https://i.imgur.com/4t2bsLT.gif)

## 使用工具
### 前端技術
----
React：利用 Hooks 形式的 function component 來完成版面
react-router-dom：處理前端路由
Styled-components：將 CSS component 化的形式來做版面配置

### 後端技術
------
Node/Express ： 串接 API 以及 CRUD 的操作，實作出處理會員認證註冊與登入程序。
jsonwebtoken ： 簽署 token 實作使用者身分驗證，確保資料不會被任意串改。
bcrypt ： 將使用者密碼雜湊之後存進資料庫。
Postgres ： 利用 SQL 語法，與 server 端串接出資料庫間 CRUD 的操作

資料庫設計
[連結](https://dbdiagram.io/d/612664e56dc2bb6073bb3d91)
![](https://i.imgur.com/fJHkDlu.png)
