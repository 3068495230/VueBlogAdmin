/*
 * @Description: 项目配置
 * @Author: CY小尘s
 * @Date: 2021-04-11 17:46:07
 * @LastEditTime: 2021-06-08 23:22:16
 * @LastEditors: 学习
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入 axios
import axios from './http/http.js'
Vue.prototype.$http = axios
// 引入 Echarts


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
