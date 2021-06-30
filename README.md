<!--
 * @Description: admin 后台描述文件
 * @Author: CY小尘s
 * @Date: 2021-06-29 00:00:13
 * @LastEditTime: 2021-07-01 01:00:38
 * @LastEditors: 学习
-->
# 导言
    想着前端部分都已经做了，何不将后台页也一并写了？正好攒攒项目实战经验。
    制作思路记过程：https://www.yuque.com/docs/share/32a32952-bfbe-4a7a-9ad8-6e4caa3c3db4?
## 分支说明
- master：默认分支，是原版后台，后台数据使用 json-server 模拟的。
- dev：去除了 json-server、axios 的版本，数据都是固定的，主要用于搭建静态网站。
- template：只有基础导航栏模板，方便自己以后再次开发后台系统项目。
# 使用教程
## 克隆项目
git clone https://gitee.com/qingchen666/vue-blog-admin.git
## 在克隆的文件夹下安装配置文件
```
npm install
```
## 运行（建议在 Vue ui 中调试运行）
```
npm run serve
```
