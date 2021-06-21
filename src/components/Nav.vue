<!--
 * @Description: 导航栏组件
 * @Author: CY小尘s
 * @Date: 2021-04-13 17:48:22
 * @LastEditTime: 2021-04-16 10:00:33
 * @LastEditors: 学习
-->
<template>
  <div class="nav">
      <!-- element ui 左侧导航栏 -->
      <el-col :span="12">
        <router-link to="/home">
            <!-- 头像 -->
            <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </router-link>
        <!-- 导航栏 -->
        <el-menu default-active="$route.path" exact router>
            <!-- 使用导航树组件循环渲染出所有项 -->
            <nav-item v-for="(v, i) in items" :key="i" :item="v"></nav-item>
        </el-menu>
    </el-col>
  </div>
</template>

<script>
// 引入导航树
import NavItem from '../components/NavItem'

export default {
    name: 'Nav',
    components:{
        NavItem
    },
    data() {
        return {
            // 导航栏数据
            items: [
                {
                    name: '首页',
                    url: '/index',
                    icon: 'el-icon-menu'
                },
                {
                    name: '用户管理',
                    url: '/user',
                    icon: 'el-icon-user-solid',
                    child: [
                        {
                            name: '用户列表',
                            url: '/user/userList',
                            icon: 'el-icon-s-data',
                        },
                        {
                            name: '用户添加',
                            url: '/user/userAdd',
                            icon: 'el-icon-circle-plus',
                        }
                    ],
                },
                {
                    name: '分类管理',
                    url: '/classfiy',
                    icon: 'el-icon-s-order'
                },
                {
                    name: '博客管理',
                    url: '/blog',
                    icon: 'el-icon-reading',
                    child: [
                        {
                            name: '博客列表',
                            url: '/blog/blogList',
                            icon: 'el-icon-s-data',
                        },
                        {
                            name: '博客添加',
                            url: '/blog/blogAdd',
                            icon: 'el-icon-edit-outline',
                        }
                    ],
                },
                {
                    name: '错误页面',
                    url: '/error',
                    icon: 'el-icon-error',
                    child: [
                        {
                            name: '401',
                            url: '/error/401',
                            icon: 'el-icon-error',
                        },
                        {
                            name: '404',
                            url: '/error/404',
                            icon: 'el-icon-error',
                        }
                    ],
                },
                {
                    name: '账户安全',
                    url: '/security',
                    icon: 'el-icon-lock',
                }
            ]
        }
    },

}
</script>

<style lang="less" scoped>
/* 导航栏 */
.nav{
    width: auto;
    height: 100%;
    /* 导航栏布局 */
    .el-col{
        width: 100%;
        height: 100%;
        /* 导航栏列表 */
        .el-menu{
            background-color: #354153;
            border: none;
            color: white;
            /* 导航栏列表项 */
            i, span{
                color: white;
            }
            /* 导航栏列表项被点击时 */
            .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:focus, .el-submenu__title:hover{
                background-color: black;
            }
        }
        // 头像样式
        .el-avatar{
            margin: 20px 0px 0px 20px;
        }
    }
}
</style>