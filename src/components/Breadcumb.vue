<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-04-13 18:07:44
 * @LastEditTime: 2021-04-16 09:56:29
 * @LastEditors: 学习
-->
<template>
  <div class="breadcumb">
    <!-- element ui 面包屑组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="height: 100%;">
        <!-- 遍历面包屑 -->
        <el-breadcrumb-item v-for="(v, i) in breadList" :key="i">
            <!-- 面包屑内容：使用 router-link 代替，实现点击面包路由跳转 -->
            <router-link :to="v.path">{{ v.meta.title }}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 退出登录按钮 -->
    <el-button type="primary" @click="goBack">退出</el-button>
  </div>
</template>

<script>
export default {
    // 此组件名
    name: 'Breadcumb',
    // 数据
    data() {
        return {
            // 初始化面包屑组内容
            breadList: []
        }
    },
    // 方法
    methods: {
        // 退出登录
        goBack(){
            // 跳转到登录页面
            this.$router.push('/login')
            // 移除保存本地的 用户信息
            sessionStorage.removeItem('username')
        }
    },
    // 监听
    watch:{
        // 监听路由是否发生变化
        $route(to, from){
            // 发生变化时，修改面包屑内容，使其更新面包屑
            this.breadList = to.matched
        }
    },
    // 页面创建时
    created(){
        // 获取当前路由，将其放入面包屑中
        this.breadList = this.$route.matched
    }
}
</script>

<style lang="less" scoped>
/* 面包屑 */
.breadcumb{
    width: 100%;
    height: 60px;
    z-index: 10;
    position: relative;
    /* 面包屑布局 */
    .el-breadcrumb{
        width: 100%;
        padding-top: 20px;
        /* 面包屑每项 */
        .el-breadcrumb__item{
            height: 2vh;
            font-weight: 600;
        }
    }
    /* 退出按钮 */
    button.el-button{
        position: absolute;
        top: 10px;
        right: 0;
    }
}
</style>