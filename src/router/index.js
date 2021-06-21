/*
 * @Description: 文件描述
 * @Author: CY小尘s
 * @Date: 2021-04-11 17:46:07
 * @LastEditTime: 2021-04-16 09:41:50
 * @LastEditors: 学习
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue"

Vue.use(VueRouter);

const routes = [
  // 默认页面
  {
    path: "/",
    component: Home
  },
  // 登录页
  {
    path: "/login",
    name: "login",
    component: Login
  },
  // 后台首页
  {
    path: "/home",
    name: "home",
    // 重定向
    redirect: '/index',
    meta: {
      title: '首页'
    },
    component: Home,
    // 后台子页
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('../components/Index.vue')
      },
      // 用户管理页
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: {render(c) { return c('router-view') }},
        // 用户列表、添加页
        children: [
          {
            path: '/user/userList',
            name: 'userList',
            meta: {
              title: '用户列表'
            },
            component: () => import('../components/user/userList.vue'),
          },
          {
            path: '/user/userAdd',
            name: 'userAdd',
            meta: {
              title: '用户添加'
            },
            component: () => import('../components/user/userAdd.vue'),
          }
        ],
      },
      // 文章管理页
      {
        path: '/blog',
        name: 'blog',
        meta: {
          title: '文章管理'
        },
        component: {render(c) { return c('router-view') }},
        // 文章列表、添加页
        children: [
          {
            path: '/blog/blogList',
            name: 'blogList',
            meta: {
              title: '文章列表'
            },
            component: () => import('../components/blog/blogList.vue')
          },
          {
            path: '/blog/blogAdd',
            name: 'blogAdd',
            meta: {
              title: '文章添加'
            },
            component: () => import('../components/blog/blogAdd.vue')
          }
        ]
      },
      {
        path: '/error',
        name: 'error',
        meta: {
          title: '文章管理'
        },
        component: {render(c) { return c('router-view') }},
        // 文章列表、添加页
        children: [
          {
            path: '/error/401',
            name: 'error401',
            meta: {
              title: '401 页面'
            },
            component: () => import('../components/error/401.vue')
          },
          {
            path: '/error/404',
            name: 'error404',
            meta: {
              title: '404 页面'
            },
            component: () => import('../components/error/404.vue')
          }
        ]
      },
      // 分类管理页
      {
        path: '/classfiy',
        name: 'classfiy',
        meta: {
          title: '分类管理'
        },
        component: () => import('../components/Classfiy.vue')
      },
      // 账户安全页
      {
        path: '/security',
        name: 'security',
        meta: {
          title: '账户安全'
        },
        component: () => import('../components/Security.vue')
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});

// 路由拦截
router.beforeEach((to, from, next) => {
  // 判断是否没有 本地登录信息，用户是否没有保持着登录状态
  if(!sessionStorage.getItem('username')){
    // 地址不是 login 时跳转到 login 中
    if(to.path !== '/login'){
      alert('未登录！')
      next('/login')
    }
  }
  // 继续跳转
  next()
})

export default router;
