<!--
 * @Description: 导航栏列表项组件
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

// 无子级样式
<style lang="less" scoped>
// 导航栏列表项
.navItem{
  background-color: #354153;
  // 无子级项
  .el-menu-item{
    // icon
    i, span{
        color: white;
    }
  }
}
// 动态样式
ul.el-menu{
  div.navItem{
    // 无子级项
    // 鼠标滑过
    li.el-menu-item:hover{
      background-color: black;
    }
    // 获取到焦点
    li.el-menu-item:focus{
      background-color: #354153;
      i, span{
        color: rgb(64, 158, 255);
      }
    }
  }
}
</style>

// 有子级样式
<style lang="less">
// 有子级项
.el-submenu{
  .el-submenu__title{
    i, span{
      color: white;
    }
  }
}
// 展开后子级项
.el-submenu.is-opened{
  // 子级项
  .el-menu.el-menu--inline{
    // 嵌套子列表
    .navItem{
      background-color: #354153;
      // 子列表项
      .el-menu-item{
        background-color: #1f2d3d;
        // 子列表 icon
        i, span{
            color: white;
        }
      }
    }
  }
}
// 动态样式
ul.el-menu{
  div.navItem{
    // 有子级项
    li.el-submenu{
      // 鼠标滑过
      div.el-submenu__title:hover{
        background-color: black;
      }
      // 获取到焦点
      div.el-submenu__title:focus{
        i, span{
          color: rgb(64, 158, 255);
        }
      }
    }
    // 子级项展开时
    li.el-submenu.is-opened{
      // 鼠标滑过
      div.el-submenu__title:hover{
        background-color: black;
      }
      // 获取到焦点
      div.el-submenu__title:focus{
        i, span{
          color: rgb(64, 158, 255);
        }
      }
      // 子级项
      ul.el-menu.el-menu--inline{
        div.navItem{
          // 鼠标滑过
          li.el-menu-item:hover{
            background-color: black;
          }
          // 获取到焦点
          li.el-menu-item:focus{
            background-color: #1f2d3d;
            i, span{
              color: rgb(64, 158, 255);
            }
          }
        }
      }
    }
  }
}
</style>