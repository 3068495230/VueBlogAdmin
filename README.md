<!--
 * @Description: admin 后台描述文件
 * @Author: CY小尘s
 * @Date: 2021-06-29 00:00:13
 * @LastEditTime: 2021-07-01 00:58:12
 * @LastEditors: 学习
-->
# 导言
    想着前端部分都已经做了，何不将后台页也一并写了？正好攒攒项目实战经验。
    制作思路记过程：https://www.yuque.com/docs/share/32a32952-bfbe-4a7a-9ad8-6e4caa3c3db4?
## 分支说明
- master：默认分支，是原版后台，后台数据使用 json-server 模拟的。
- dev：去除了 json-server、axios 的版本，数据都是固定的，主要用于搭建静态网站。
- template：只有基础导航栏模板，方便自己以后再次开发后台系统项目。
## 后台页面说明
### Login 登录页
    表单验证登录信息
### Home 后台首页
    后台默认页，进入后台时会进行判断是否有本地账户信息，如若没有回跳转至登录页
    index 默认首页
### User 用户管理页
    userList 用户列表：表格展示所有用户
    userAdd 用户添加：表单添加用户
### Blog 文章管理页
    blotLIst 文章列表：表格展示所有文章
    blogAdd 文章添加：富文本组件添加文章
### Error 错误页
    401 错误页：401 错误页展示
    404 错误页：404 错误页展示
### Classify 分类页面
    表格管理文章所有分类信息
### Security 账户安全
    显示、修改登陆者信息
### Permissions
    权限验证、切换
## 后台数据大致分类：
### user
    存放用户信息
### classify
    存放分类信息
### blog
    存放 blog 相关信息
### state
    存放后台的数据
### echarts
    存放 Echarts 图表数据
# 使用教程
## 克隆项目
git clone https://gitee.com/qingchen666/vue-blog-admin.git
## 在克隆的文件夹下安装配置文件
```
npm install
```
## 运行（建议在 Vue ui 中调试运行）
```
// 运行项目
npm run serve
// 运行服务器
npm run server
```