<!--
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-04-15 22:47:04
 * @LastEditTime: 2021-04-16 10:01:39
 * @LastEditors: 学习
-->
<template>
  <div class="navItem">
    <!-- 无子级项，通过 v-if 判断是否有子选项决定是否显示 -->
    <el-menu-item :index="item.url" v-if="!item.child">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
    </el-menu-item>

    <!-- 有子级项 -->
    <el-submenu v-else :index="item.url">
        <template slot="title">
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
        </template>
        <!-- 子选项，递归调用-->
        <nav-item v-for="(child, i) in item.child" :key="i" :item="child" :basePath="child.url"></nav-item>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name: 'NavItem',
    // 接受父组件数据
    props: ['item']
}
</script>

<style>

</style>