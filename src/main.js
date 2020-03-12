import Vue from 'vue';
import VueRouter from 'vue-router'
import cookieParse from 'cookie-parse'
import axios from 'axios'

Vue.prototype.$axios = axios;//需要挂载到Vue的原型链上
Vue.prototype.$cookieParse = cookieParse;
Vue.prototype.$router = VueRouter;

Vue.use(VueRouter);


import router from './js/router/loginBox-router.js';

import './css/global.css';//加载全局样式
import  '../lib/mui/css/mui.css';
import  '../lib/mui/js/mui.js';


import loginBox from "../component/Login/loginBox.vue";


let vm_login = new Vue({
   el:'#login_register',//绑定对象
    render:createElement=>createElement(loginBox),//用render函数渲染组件
    router,//挂载路由对象
});